type PasswordResetQueryDataType = {
  email: string;
};

// Query Props
type useFoldersListQuery_data = {
  ordering?: string;
  search?: string;
  page?: string;
};

// DRF Response

type DRFListResponseType<T> = {
  count: number;
  next: null | string;
  previous: null | string;
  results: T[];
};

// Pure types

type APIFolderType = {
  created_at: string;
  folder_name: string;
  id: string;
  media: any[];
  parent: null | any;
  sub_folder: any[];
  updated_at: string;
};

// List Response Types

type DRFFolderListResponseType = DRFListResponseType<APIFolderType>;

// Responses

const A = {
  count: 5,
  next: null,
  previous: null,
  results: [
    {
      created_at: "2024-07-19T16:39:06.455844Z",
      folder_name: "Test 2",
      id: "ef43a3d0-d435-4a31-a731-04f2365e5145",
      media: [Array],
      parent: null,
      sub_folder: [Array],
      updated_at: "2024-07-19T16:39:06.455877Z",
    },
  ],
};

export type {
  PasswordResetQueryDataType,
  useFoldersListQuery_data,
  DRFListResponseType,
  APIFolderType,
  DRFFolderListResponseType,
};
