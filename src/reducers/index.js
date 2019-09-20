import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import films from './films';
import {reducer as toastrReducer} from 'react-redux-toastr'



export default combineReducers({
  films: films,
  router: routerReducer,
  toastr: toastrReducer // <- Mounted at toastr.

})

