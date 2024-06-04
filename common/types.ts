export interface ApiResponseSuccess {
  data?: {
    message?: string;
    access?: string;
  };
  access?:string
}

export interface ApiResponseError {
  error?: {
    status?: number;
    data?: {
      non_field_errors?: string;
      password?: string;
    };
  };
}

export type ApiResponse = ApiResponseSuccess | ApiResponseError;