import { NOTIFY_USER } from "../actions/types";

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */

const initialState = {
  message: null,
  messageType: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NOTIFY_USER:
      return {
        ...state,
        message: action.message,
        messageType: action.messageType
      };
    default:
      return state;
  }
}
