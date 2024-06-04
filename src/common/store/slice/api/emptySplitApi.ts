import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './customFetchBaseQuery';

export const emptySplitApi = createApi({
  reducerPath: 'serverApis',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ['folders'],
});
