import { TRequestStatus } from "@lib/types/api";

export type TAuthState = {
  auth: {
    accessToken: string | null;
    isKid: boolean | null;
    isFemale: boolean | null;
    birthday: string | null;
    username: string | null;
    phone: string | null;
  };
  requestStatus: TRequestStatus; // for GET method
};

export interface IAuth {
  accessToken: string | null;
  isKid: boolean | null;
}

export interface IBirthDay {
  birthday: string;
}

export interface IRole {
  isKid: boolean;
  isFemale: boolean;
}
