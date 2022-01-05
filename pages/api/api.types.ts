export interface ResponseError {
  data: string | null;
  error: {
    details: {
      errors: {
        path: string;
        message: string;
        name: string;
      }[];
    };
    message: string;
    name: string;
    status: number;
  };
}
