import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import React, { Fragment, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Avatar } from '@mui/material';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchBar from 'material-ui-search-bar';
import PeopleIcon from '@mui/icons-material/People';
import { Button } from '@material-ui/core';
import { useNavigate, NavLink, Link} from 'react-router-dom';

import { useSelector, useDispatch} from 'react-redux';
import { useGetUserDetailsQuery } from '../redux/features/api/authApi';
import { setCredentials, setUserProfileDetails } from '../redux/features/api/authSlice';
import { useGetUserProfileDetailsQuery } from '../redux/features/api/authApi';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginRight: theme.spacing(30)
  },
  listItem: {
    paddingLeft: theme.spacing(4)
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

   // Header
   grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
      marginLeft: '',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

}));

const Layout = ({children }) => {


  const dispatch = useDispatch()

  const { userInfo, isAuthenticated} = useSelector((state) => state.auth)

  let id
  if (userInfo) {
    id = userInfo.id;
  }

  const {data: userProfileDetails} = useGetUserProfileDetailsQuery(id, {pollingInterval: 900000,
    refetchOnMountOrArgChange: true,
    skip: false,})

    useEffect(() => {
      if (userProfileDetails) dispatch(setUserProfileDetails(userProfileDetails));
    }, [userProfileDetails, dispatch])

  const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
      pollingInterval: 900000,
    })

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch])

  const { window } = children;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

  const handleMessageClick = (e) => {
    navigate('/messages');
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button onClick={handleMessageClick}>
          <Badge badgeContent={userProfileDetails?.message_count} color="secondary">
            <MailIcon />
          </Badge>
          <ListItemText primary="Messages" className={classes.listItem}/>
        </ListItem>
        <ListItem button>
          <PeopleIcon />
          <ListItemText primary="People" className={classes.listItem}/>
        </ListItem>
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
 
  const guestLinks = () => (
    <Fragment>
        <Link
            component={NavLink}
            to="/signup"
            underline="none"
            color="textPrimary"
          >
          <Button color="white">Signup</Button>
          </Link>
          <Link
            to="/login"
            underline="none"
            color="textPrimary"
          >
          <Button color="white">Login</Button>
          </Link>
    </Fragment>
);

const authLinks = () => (
    <Link
    to="/logout"
    underline="none"
    color="inherit"
    >
    <Button color="white">Logout</Button>
    </Link>
);

  const navigate = useNavigate();
	// const [data, setData] = useState({ search: '' });

	// const goSearch = (e) => {
	// 	navigate({
	// 		pathname: '/search/',
	// 		search: '?search=' + data.search,
	// 	});
	// 	window.location.reload();
	// };
	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
		anchorEl={anchorEl}
		anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		id={menuId}
		keepMounted
		transformOrigin={{ vertical: 'top', horizontal: 'right' }}
		open={isMenuOpen}
		onClose={handleMenuClose}
		>
		<MenuItem onClick={handleMenuClose}><Link to="/user-profile">Profile</Link></MenuItem>
		<MenuItem onClick={handleMenuClose}><Link to="/logout">Logout</Link></MenuItem>
		<MenuItem onClick={handleMenuClose}>My account</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
		anchorEl={mobileMoreAnchorEl}
		anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		id={mobileMenuId}
		keepMounted
		transformOrigin={{ vertical: 'top', horizontal: 'right' }}
		open={isMobileMenuOpen}
		onClose={handleMobileMenuClose}
		>
		<MenuItem>
			<IconButton aria-label="shows number of new messages" color="inherit">
			<Badge badgeContent={userProfileDetails?.message_count} color="secondary">
				<MailIcon />
			</Badge>
			</IconButton>
			<p>Messages</p>
		</MenuItem>
		<MenuItem>
			<IconButton aria-label="show 11 new notifications" color="inherit">
			<Badge badgeContent={11} color="secondary">
				<NotificationsIcon />
			</Badge>
			</IconButton>
			<p>Notifications</p>
		</MenuItem>
		<MenuItem onClick={handleProfileMenuOpen}>
			<IconButton
			aria-label="account of current user"
			aria-controls="primary-search-account-menu"
			aria-haspopup="true"
			color="inherit"
			>
			<AccountCircle />
			</IconButton>
			<p>Profile</p>
		</MenuItem>
		</Menu>
	);

  return (
    <div className={classes.root}>
      <CssBaseline />
        <div className={classes.grow}>
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
            >
                <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
                EXODT
            </Typography>
            <SearchBar
                            // value={data.search}
                            // onChange={(newValue) => setData({ search: newValue })}
                            // onRequestSearch={() => goSearch(data.search)}
                        />
            <div className={classes.grow} >
            <span>
            {isFetching
                ? `Fetching your profile...`
                : userInfo !== null
                ? `Logged in as ${userInfo.username}`
                : "You're not logged in"}
            </span>
            <Link
                                to="/"
                                underline="none"
                                color="textPrimary"
                            >
                                Home
                            </Link>
            {isAuthenticated ? authLinks() : guestLinks()}
            </div>
            <div className={classes.sectionDesktop}>
                <IconButton aria-label="show number of new messages" color="inherit" onClick={handleMessageClick}>
                <Badge badgeContent={userProfileDetails?.message_count} color="secondary">
                    <MailIcon />
                </Badge>
                </IconButton>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                </Badge>
                </IconButton>
                <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                >
                {userProfileDetails ? (
                    <Avatar
                    src={userProfileDetails.profile_image} 
                    alt="User Profile" 
                    sx={{ width: 24, height: 24 }}
                    />
                ) : (
                    <AccountCircle />
                )}
                </IconButton>
            </div>
            <div className={classes.sectionMobile}>
                <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
                >
                <MoreIcon />
                </IconButton>
            </div>
            </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        </div>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
      <div className={classes.toolbar} />
      {children}
     
      </main>
    </div>
  );
}

Layout.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };

export default Layout;
