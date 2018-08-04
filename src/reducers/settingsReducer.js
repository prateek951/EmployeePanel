import {
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
  ALLOW_REGISTRATION
} from "../actions/types";


export default function(state = {}, action) {
  switch (action.type) {
    case DISABLE_BALANCE_ON_ADD:
      return { ...state, disableBalanceOnAdd: action.payload };
      break;
    case DISABLE_BALANCE_ON_EDIT:
      return { ...state, disableBalanceOnEdit: action.payload };
      break;
    case ALLOW_REGISTRATION:
      return { ...state, allowRegistration: action.payload };
      break;
    default:
      return state;
  }
}
