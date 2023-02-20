import React, {useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/features/api/authSlice'
import { useDispatch} from 'react-redux';

export default function SignUp() {
	const navigate = useNavigate();
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(logout())
		navigate('/login');
	});
	return <div>Logout</div>;
}