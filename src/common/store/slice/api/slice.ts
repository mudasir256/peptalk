import { emptySplitApi } from './emptySplitApi';

export const apiSlice = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: '/registration/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => {
        return({
        url: '/login/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: user,
      })}
    }),
    googleLogin: builder.mutation({
      query: (data) => {
        return({
        url: '/google',
        method: 'POST',
        body: data,
      })}
    }),
    appleLogin: builder.mutation({
      query: (data) => {
        return({
        url: '/apple/auth-code/',
        method: 'POST',
        body: data,
      })}
    }),
    user: builder.query({
      query: () => {
        return({
        url: '/user/',
        method: 'GET',
      })},
    }),
    foldersList: builder.query({
      query: () => ({
        url: '/child-encouragement/folder/list/',
        method: 'GET',
    }),
    providesTags:["folders"]
    }),
    addFolderMutation: builder.mutation({
      query: (data) => {
        return {
          url: '/child-encouragement/folder/',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: data,
        };
      },
      invalidatesTags:["folders"]
    }),
    updateFolder: builder.mutation({
      query: ({id,data}) => {
        return {
          url: `/child-encouragement/folder/${id}/update/`,
          method: 'PATCH',
          body:data
        };
      },
      invalidatesTags:["folders"]
    }),
    deleteFolder: builder.mutation({
      query: ( id ) => ({
        url: `/child-encouragement/folder/${id}/delete/`,
        method: 'DELETE',
      }),
      invalidatesTags: ["folders"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/logout/`,
        method: 'POST',
      }),
    }),
    getMediaList: builder.query({
      query: () => ({
        url: `/child-encouragement/media/list`,
        method: 'GET',
      }),
    }),
    addVideo: builder.mutation({
      query: (data) => {
        return({
        url: '/child-encouragement/media/',
        method: 'POST',
        body: data,
      })}
    }),
  })
})

export const {useRegisterMutation, useLoginMutation, useUserQuery, useFoldersListQuery, useAddFolderMutationMutation, useUpdateFolderMutation, useDeleteFolderMutation, useLogoutMutation,useGoogleLoginMutation,useAppleLoginMutation,useGetMediaListQuery, useAddVideoMutation} = apiSlice;
