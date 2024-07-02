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
      query: (data) => ({
        url: `/child-encouragement/media/list?ordering${data}`,
        method: 'GET',
      }),
      providesTags: ["Media"],
    }),
    addVideo: builder.mutation({
      query: (data) => {
        return({
        url: '/child-encouragement/media/',
        method: 'POST',
        body: data,
      })}
    }),
    getFoldersListById: builder.query({
      query: (id) => {
          return {
              url: `/child-encouragement/folder/${id}/`,
              method: 'GET',
          };
      },
      providesTags:["FoldersByID"]
  }),
    deleteMedia: builder.mutation({
      query: ( id ) => ({
        url: `/child-encouragement/media/${id}/delete/`,
        method: 'DELETE',
      }),
      invalidatesTags: ["FoldersByID","Media"],
    }),
    moveFolder: builder.mutation({
      query: ({id,data}) => {
        return {
          url: `/child-encouragement/media/${id}/update/`,
          method: 'PATCH',
          body:data
        };
      },
      invalidatesTags:["FoldersByID","Media","folders"]
    }),
    updateMedia: builder.mutation({
      query: ({id,data}) => {
        return {
          url: `/child-encouragement/media/${id}/update/`,
          method: 'PATCH',
          body:data
        };
      },
      invalidatesTags:["FoldersByID","Media","folders"]
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        console.log("datyata", data)
        return({
        url: '/password/change/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      })}
    }),
    uploadMedia: builder.mutation({
      query: (formData) => ({
        url: '/child-encouragement/upload/',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      }),
    }),  
    getSearch: builder.query({
      query: (data) => ({
        url: `/child-encouragement/media/list?search=${data}`,
        method: 'GET',
      }),
    }), 
  })
})
export const {useRegisterMutation, useLoginMutation, useUserQuery, useFoldersListQuery, useAddFolderMutationMutation, useUpdateFolderMutation, useDeleteFolderMutation, useLogoutMutation,useGoogleLoginMutation,useAppleLoginMutation,useGetMediaListQuery, useAddVideoMutation,useGetFoldersListByIdQuery, useDeleteMediaMutation, useMoveFolderMutation, useUpdateMediaMutation, useResetPasswordMutation,useUploadMediaMutation,useGetSearchQuery } = apiSlice;
