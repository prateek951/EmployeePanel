import {
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
  ALLOW_REGISTRATION
} from "./types";

export const disableBalanceOnAdd = () => {
  //Get settings from localStorage
  const settings = JSON.parse(localStorage.getItem('settings'));
  //Toggle 
  settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd;

  //Set it back to the localStorage
  localStorage.setItem('settings',JSON.stringify(settings));

  return {
    type: DISABLE_BALANCE_ON_ADD,
    payload: settings.disableBalanceOnAdd
  };
};

export const disableBalanceOnEdit = () => {

  //Get settings from localStorage
  const settings = JSON.parse(localStorage.getItem('settings'));
  //Toggle
  settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit;
  //Set it back to localStorage
  localStorage.setItem('settings',JSON.stringify(settings));
  return {
    type: DISABLE_BALANCE_ON_EDIT,
    payload: settings.disableBalanceOnEdit
  };
};

export const allowRegistration = () => {


  //Fetch settings from localStorage
  const settings = JSON.parse(localStorage.getItem('settings'));
  //toggle setting
  settings.allowRegistration = !settings.allowRegistration;
  //set back to localStorage
  localStorage.setItem('settings',JSON.stringify(settings));
  
  return {
    type: ALLOW_REGISTRATION,
    payload: settings.allowRegistration
  };
};
