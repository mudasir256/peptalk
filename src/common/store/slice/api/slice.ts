import { emptySplitApi } from "./emptySplitApi";
import { objectToQueryParams } from "./functions";
import {
  DRFFolderListResponseType,
  PasswordResetQueryDataType,
  useFoldersListQuery_data,
} from "./types";

export const apiSlice = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: "/registration/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => {
        return {
          url: "/login/",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: user,
        };
      },
    }),
    googleLogin: builder.mutation({
      query: (data) => {
        return {
          url: "/google",
          method: "POST",
          body: data,
        };
      },
    }),
    appleLogin: builder.mutation({
      query: (data) => {
        return {
          url: "/apple/auth-code/",
          method: "POST",
          body: data,
        };
      },
    }),
    user: builder.query({
      query: () => {
        return {
          url: "/user/",
          method: "GET",
        };
      },
    }),
    foldersList: builder.query<
      DRFFolderListResponseType,
      useFoldersListQuery_data
    >({
      query: (data) => {
        const url = `/child-encouragement/folder/list/?${objectToQueryParams(
          data
        )}`;

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["folders"],
    }),
    addFolderMutation: builder.mutation({
      query: (data) => {
        return {
          url: "/child-encouragement/folder/",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: data,
        };
      },
      invalidatesTags: ["folders"],
    }),
    updateFolder: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/child-encouragement/folder/${id}/update/`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["folders"],
    }),
    deleteFolder: builder.mutation({
      query: (id) => ({
        url: `/child-encouragement/folder/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["folders"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/logout/`,
        method: "POST",
      }),
    }),
    getMediaList: builder.query({
      query: (data) => {
        return {
          url: `/child-encouragement/media/list`,
          method: "GET",
          params: {
            ordering: data.ordering,
            page: data.page,
            limit: data.limit,
          },
        };
      },
      providesTags: (result) =>
        result
          ? result.results.map(({ id }) => ({ type: "Media", id }))
          : [{ type: "Media", id: "LIST" }],
    }),

    addVideo: builder.mutation({
      query: (data) => {
        return {
          url: "/child-encouragement/media/",
          method: "POST",
          body: data,
        };
      },
    }),
    getFoldersListById: builder.query<any, { id: any; ordering_media: string }>(
      {
        query: ({ id, ordering_media }) => {
          return {
            url: `/child-encouragement/folder/${id}/?${objectToQueryParams({
              ordering_media,
            })}`,
            method: "GET",
          };
        },
        providesTags: ["FoldersByID"],
      }
    ),
    deleteMedia: builder.mutation({
      query: (id) => ({
        url: `/child-encouragement/media/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => {
        return [{ type: "Media", id }, { type: "FoldersByID" }];
      },
    }),

    moveFolder: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/child-encouragement/media/${id}/update/`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["FoldersByID", "Media", "folders"],
    }),
    updateMedia: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/child-encouragement/media/${id}/update/`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["FoldersByID", "Media", "folders"],
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: "/password/change/",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: data,
        };
      },
    }),
    uploadMediaInit: builder.mutation({
      query: (formData) => ({
        url: "/child-encouragement/upload/",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      }),
    }),
    uploadMedia: builder.mutation({
      query: (formData) => ({
        url: "/child-encouragement/upload/",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      }),
    }),
    uploadMediaComplete: builder.mutation({
      query: (formData) => ({
        url: "/child-encouragement/upload/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Media", "folders", "FoldersByID"],
    }),
    getSearch: builder.query({
      query: (data) => ({
        url: `/child-encouragement/media/list?search=${data}`,
        method: "GET",
      }),
    }),
    forgotPassword: builder.mutation<any, PasswordResetQueryDataType>({
      query: (data) => ({
        url: "/password/reset/",
        method: "POST",
        body: data,
      }),
    }),
    deleteAccount: builder.mutation<any, { password: string }>({
      query: (data) => ({
        url: "/user/delete-user/",
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useUserQuery,
  useFoldersListQuery,
  useAddFolderMutationMutation,
  useUpdateFolderMutation,
  useDeleteFolderMutation,
  useLogoutMutation,
  useGoogleLoginMutation,
  useAppleLoginMutation,
  useGetMediaListQuery,
  useAddVideoMutation,
  useGetFoldersListByIdQuery,
  useDeleteMediaMutation,
  useMoveFolderMutation,
  useUpdateMediaMutation,
  useResetPasswordMutation,
  useUploadMediaMutation,
  useGetSearchQuery,
  useUploadMediaCompleteMutation,
  useUploadMediaInitMutation,
  useForgotPasswordMutation,
  useDeleteAccountMutation,
} = apiSlice;
