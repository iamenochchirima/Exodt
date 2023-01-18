import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useVerifyUserMutation } from '../../redux/features/api/authApi';


const Activate = () => {
    const { verified } = useSelector((state) => state.auth);
    const {uid, token } = useParams();
    const dispatch = useDispatch();

    const [verifyUser, { isLoading}] = useVerifyUserMutation()
    const body = { uid, token };

    const handleSubmit = async () => {
        if(body) {
            console.log(body, 'clicked')
            try {
                await verifyUser(body)
                .unwrap()
                .then((payload) => console.log('fulfilled', payload))
            } catch (err) {
                console.error('Failed to save the post: ', err)
              }
        }
    };

    if (verified) {
        return <Navigate to='/login' />
    }

    return (
        <div className='container'>
            <div 
                className='d-flex flex-column justify-content-center align-items-center'
                style={{ marginTop: '200px' }}
            >
                <h1>Verify your Account:</h1>
                <button
                    onClick={handleSubmit}
                    style={{ marginTop: '50px' }}
                    type='button'
                    className='btn btn-primary'
                >
                    Verify
                </button>
            </div>
        </div>
    );
};

export default Activate;