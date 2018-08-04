import { NOTIFY_USER } from "./types";

//ActionCreators go here
export const notifyUser = (message,messageType) => {
    return {
        type : NOTIFY_USER,
        message: message,
        messageType: messageType
    }
}