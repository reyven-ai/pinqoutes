export type ErrorResponse = {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
  message?: string;
};
