import * as actionTypes from '../actions/actionTypes'

const initialState = {
 
  loading: false,
  success: false,
  success_message: undefined,
  error: undefined,
  data: [],  
}

const films = (state=initialState,action) => {

  switch(action.type){
    case actionTypes.GET_REQUEST_SUCCESS: 
      return {...state,loading: true, error: undefined};
    case actionTypes.GET_RESPONSE_ERROR:
      return{...state, loading: false, error: action.payload.response.data.error} 
    case actionTypes.GET_ALL_FILMS:
      return {...state,loading: false,data: action.payload.response.results, count: action.payload.response.count};
    case actionTypes.GET_PARTICULAR_FILM:
      return {...state, loading: false, film:  action.payload.response}
    case actionTypes.HOVER_ACTION_SUCCESS:
      return {...state, hoverLoading: false, characters: action.payload.response}
    case actionTypes.GET_HOVER_REQUEST:
      return {...state, hoverLoading: true,characters: {}}
    default: 
      return {...state, loading: false} 
  }  
}

export default films

