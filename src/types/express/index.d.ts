// This is done to extend the Request interface in express
declare namespace Express {
  export interface Request {
    user: {
      userId: string;
      name: string;
      role: string;
    } | null;
  }
}
