import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { BASE_URL } from './baseUrl';
import { setToken } from '../authentication/slice';

interface RefreshTokenResponse {
    access: string;
  }
const mutex = new Mutex();

const customFetchBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const authState = (getState() as any)?.authentication;
    const { accessToken } = authState;
    if (accessToken && endpoint !== '/token/refresh/') {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await customFetchBaseQuery(args, api, extraOptions);
  const refreshToken= (api.getState() as any)?.authentication?.refreshToken
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await customFetchBaseQuery(
          {
            url: '/token/refresh/',
            method: 'POST',
            body: {
              refresh: refreshToken,
            },
          },
          api,
          extraOptions
        );
        if ((refreshResult.data as RefreshTokenResponse)?.access) {
          const { access } = refreshResult.data as RefreshTokenResponse;
          api.dispatch(setToken({ accessToken: access, refreshToken: (api.getState() as any)?.authentication?.refreshToken }));

          result = await customFetchBaseQuery(args, api, extraOptions);
        } else {
          // api.dispatch({ type: 'authentication/logout' });
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await customFetchBaseQuery(args, api, extraOptions);
    }
  }

  return result;
};
