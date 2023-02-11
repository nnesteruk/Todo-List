import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BASEURL}`, prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ['Task'],
    endpoints: (build) => ({
        getTasks: build.query({
            query: () => ({
                url: '/todos'
            }),
            providesTags: (result) => ['Task']
        }),
        addTask: build.mutation({
            query: (task) => ({
                url: '/todos',
                method: 'POST',
                body: task
            }),
            invalidatesTags: ['Task']
        }),
        updateTask: build.mutation({
            query: ({ newTitle, ID }) => ({
                url: `/todos/${ID}`,
                method: 'PATCH',
                body: { title: newTitle }
            }),
            invalidatesTags: ['Task']
        }),
        removeTask: build.mutation({
            query: (ID) => ({
                url: `/todos/${ID}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Task']
        }),
        doneTask: build.mutation({
            query: (ID) => ({
                url: `/todos/${ID}/isCompleted`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Task']
        })

    })
})