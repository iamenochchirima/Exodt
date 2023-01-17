import React, {useEffect } from 'react';
// import axiosInstance from '../../Axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/login');
	});
	return <div>Logout</div>;
}