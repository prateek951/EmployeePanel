import {
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
  ALLOW_REGISTRATION
} from "./types";

export const disableBalanceOnAdd = () => {
  return {
    type: DISABLE_BALANCE_ON_ADD
  };
};

export const disableBalanceOnEdit = () => {
  return {
    type: DISABLE_BALANCE_ON_EDIT
  };
};

export const allowRegistration = () => {
  return {
    type: ALLOW_REGISTRATION
  };
};
