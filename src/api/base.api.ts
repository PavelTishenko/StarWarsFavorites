import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { Alert } from 'react-native';
import { Response } from './types.api';

export const baseQueryURL = 'https://swapi.dev/api/';

type QueryFn = BaseQueryFn<
  string | FetchArgs,
  BaseQueryApi,
  FetchBaseQueryError
>;

const baseQuery = fetchBaseQuery({
  baseUrl: baseQueryURL,
  prepareHeaders: headers => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
}) as QueryFn;

const baseQueryWithInterceptor: QueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 502) {
    Alert.alert('Ooops', 'Please try later');
  }

  return result;
};

export const baseAPI = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['GET'],
  baseQuery: baseQueryWithInterceptor,
  endpoints: builder => ({
    getCharacters: builder.query<Response[], any>({
      query: () => {
        return {
          url: 'people',
        };
      },
    }),
  }),
});

export const { useGetCharactersQuery } = baseAPI;
