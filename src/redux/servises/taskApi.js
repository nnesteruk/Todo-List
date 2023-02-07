import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://first-node-js-app-r.herokuapp.com/api', prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: (build) => ({
        getTasks: build.query({
            query: () => ({
                url: '/todos'
            })
        }),
        addTask: build.mutation({
            query: (task) => ({
                url: '/todos',
                method: 'POST',
                task
            })
        })
    })
})