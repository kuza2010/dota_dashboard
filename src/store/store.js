import {createStore} from "redux";

import dotaReducer from "./reducer/dotaReducer";


const store = createStore(dotaReducer);


export default store;
