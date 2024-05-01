import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

type TODO = {
  userId: number
  id: number
  title: string
  completed: boolean
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com', // TODO: Change to actual backend url
    prepareHeaders(headers) {
      return headers
    }
  }),
  endpoints(builder) {
    return {
      // TODO: Remove the dummy api
      fetchTodos: builder.query<TODO, number> ({
        query(id) {
          return `/todos/${id}`
        },
      })
    }
  }
})

export const {useFetchTodosQuery} = apiSlice