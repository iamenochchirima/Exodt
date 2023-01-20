import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVerifyEmailMutation } from '../../redux/features/api/authApi';
import Spinner from '../../components/Spinner'


const Activate = () => {
    const {uid, token } = useParams();
    const navigate = useNavigate();
    const [verifyUser, { isLoading, isSuccess}] = useVerifyEmailMutation()
    const body = { uid, token };

    const handleSubmit = async () => {
        if(body) {
            try {
                await verifyUser(body)
                .unwrap()
                .then((payload) => console.log('fulfilled', payload))
            } catch (err) {
                console.error('Failed to verify: ', err)
              }
        }
    };
    useEffect(() => {
        if (isSuccess) {
            navigate('/login')
        }
        }, [navigate, isSuccess])

    return (
        <div className='container'>
            <div 
                className='d-flex flex-column justify-content-center align-items-center'
                style={{ marginTop: '200px' }}
            >
                <h1>Verify your Email:</h1>
                <button
                    onClick={handleSubmit}
                    style={{ marginTop: '50px' }}
                    type='button'
                    className='btn btn-primary'
                >
                    {isLoading ? <Spinner /> : 'Verify'}
                </button>
            </div>
        </div>
    );
};

export default Activate;