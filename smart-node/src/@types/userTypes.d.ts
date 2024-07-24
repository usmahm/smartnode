import { ErrorResponseType, SuccessResponseType } from "./apiTypes";

export type UserType = {
  id: string;
  first_name: string;
  last_name: string;
  email?: string
}

export type LoginSuccesssResType = SuccessResponseType<{
  user: UserType;
  access_token: string;
}>

// export type LoginErrorResType = ErrorResponseType