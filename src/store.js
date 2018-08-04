import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";
//Reducers

const firebaseConfig = {
  apiKey: "AIzaSyDkbz4CEJDxvtOryVbNb6znU04uz-NGR14",
  authDomain: "emppanel-dc10a.firebaseapp.com",
  databaseURL: "https://emppanel-dc10a.firebaseio.com",
  projectId: "emppanel-dc10a",
  storageBucket: "emppanel-dc10a.appspot.com",
  messagingSenderId: "499741526971"
};

//react redux firebase config
const rrfconfig = {
  userProfile: "/users",
  useFirestoreForProfile: true
};

//init the firebase config
firebase.initializeApp(firebaseConfig);

//init the firestore config
const firestore = firebase.firestore();

const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

//Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfconfig),
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify : notifyReducer, 
  settings: settingsReducer 
});

//Create init state
const initialState = {};

//Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
