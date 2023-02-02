import React, { Fragment, useEffect, useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Avatar } from '@mui/material';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchBar from 'material-ui-search-bar';
import { Button } from '@material-ui/core';
import { useNavigate, NavLink, Link} from 'react-router-dom';

import { useSelector, useDispatch} from 'react-redux';
import { setUserProfileDetails } from '../../redux/features/api/authSlice';
import { useGetUserProfileDetailsQuery } from '../../redux/features/api/authApi';

import MenuIcon from '@mui/icons-material/Menu';

import useStyles from './Styles';

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 10,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));


const Header = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
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
 
  const guestLinks = () => (
    <Fragment>
      <div>
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
      </div>
    </Fragment>
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

  const handleMessageClick = (e) => {
    navigate('/messages');
  }

  const handleProfileClick = (e) => {
    navigate('/user-profile')
  }

  const handleLogoutClick = (e) => {
    navigate('/logout')
  }

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
		<MenuItem onClick={() => {handleMenuClose(); handleProfileClick();}}>Profile</MenuItem>
		<MenuItem onClick={() => {handleMenuClose(); handleLogoutClick();}}>Logout</MenuItem>
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
		<MenuItem onClick={handleMessageClick}>
			<IconButton aria-label="show number of new messages" color="inherit">
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
      <AppBar position="sticky">
        <StyledToolbar>
          <MenuIcon sx={{ display: { xs: "block", sm: "none"}}}/>
          <Typography 
          className={classes.title} 
          variant="h6" 
          >
            EXODT
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
            {isAuthenticated ? null : guestLinks()}
        
          {isAuthenticated ? (
            <div className={classes.sectionDesktop}>
            <IconButton aria-label="show number of new mails" color="inherit" onClick={handleMessageClick}>
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
          ) : null}
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
        </StyledToolbar>
      {renderMobileMenu}
      {renderMenu}
      </AppBar>
  );
}
export default Header;