import { apiSlice } from './apiSlice'

export const chatApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: () => ({
              url: '/api/messages/',
              method: 'GET',
            })
        }),
    })
});

export const {
    useGetMessagesQuery,
} = chatApi;