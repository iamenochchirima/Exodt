import React, { useState, Fragment, useEffect} from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
import { Button } from '@material-ui/core';
import { useNavigate, NavLink, Link, Navigate } from 'react-router-dom';

import { useSelector, useDispatch} from 'react-redux';
import { useGetUserDetailsQuery } from '../redux/features/api/authApi'; 
import { logout, setCredentials } from '../redux/features/auth/authSlice'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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


const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch()

  const { userInfo, isAuthenticated, success } = useSelector((state) => state.auth)

  const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
    // perform a refetch every 15mins
      pollingInterval: 900000,
    })

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch])
 
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
		<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
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
			<IconButton aria-label="show 4 new mails" color="inherit">
			<Badge badgeContent={4} color="secondary">
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
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
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
            ? `Logged in as ${userInfo.email}`
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
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
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
              <AccountCircle />
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
  );
}
export default Header;