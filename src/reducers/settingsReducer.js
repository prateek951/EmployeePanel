import {
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
  ALLOW_REGISTRATION
} from "../actions/types";

const initialState = {
  disableBalanceOnAdd: true,
  disableBalanceOnEdit: false,
  allowRegistration: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DISABLE_BALANCE_ON_ADD:
      return { ...state, disableBalanceOnAdd: !state.disableBalanceOnAdd };
      break;
    case DISABLE_BALANCE_ON_EDIT:
      return { ...state, disableBalanceOnEdit: !state.disableBalanceOnEdit };
      break;
    case ALLOW_REGISTRATION:
      return { ...state, allowRegistration: !state.allowRegistration };
      break;
    default:
      return state;
  }
}
