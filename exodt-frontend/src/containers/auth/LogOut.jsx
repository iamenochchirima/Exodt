import React, {useEffect } from 'react';
// import axiosInstance from '../../Axios';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/features/auth/authSlice'
import { useSelector, useDispatch} from 'react-redux';

export default function SignUp() {
	const navigate = useNavigate();
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(logout())
		navigate('/login');
	});
	return <div>Logout</div>;
}