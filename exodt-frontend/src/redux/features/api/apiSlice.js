import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { setCredentials, logout } from '../auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}`,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            headers.set("authorization", `JWT ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    console.log(result)
    // const refreshToken = localStorage.getItem('refreshToken');
    // if (result?.error?.status === 401 &&
    //     refreshToken === null
    //     ) {
    //     // window.location.href = '/login/';
    //     console.log('log in');
    // }

    // if (
    //     result.error.code === 'token_not_valid' &&
    //     result.error.status === 401
    // ) {

    //     if (refreshToken) {
    //         const refreshResult = await baseQuery({
    //             prepareHeaders: (headers) => {
    //                 const Token = refreshToken
    //                 if (Token) {
    //                     headers.set("authorization", `JWT ${Token}`)
    //                 }
    //                 return headers
    //             },
    //             url: 'auth/jwt/refresh/',
    //             method: 'POST',
    //             refreshToken,
    //             }, api, extraOptions)
    //         console.log(refreshResult.data, 'Here!!!')
    //         if (refreshResult?.data) {
    //             localStorage.setItem('accessToken', refreshResult.data.access);
	// 		    localStorage.setItem('refreshtoken', refreshResult.data.refresh);
    //             result = await baseQuery(args, api, extraOptions)
    //         } else {
	// 			console.log('Refresh token not available.');
	// 			api.dispatch(logout())
	// 		}
    //      }
    // }

    return result
}

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})