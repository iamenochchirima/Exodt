import { apiSlice } from './apiSlice'

export const chatApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (id) => ({
              url: `/api/messages_get/${id}/`,
              method: 'GET',
            })
        }),
        getChats: builder.query({
            query: (id) => ({
              url: `/api/conversations_get/${id}/`,
              method: 'GET',
            })
        }),
    })
});

export const {
    useGetMessagesQuery,
    useGetChatsQuery,
} = chatApi;