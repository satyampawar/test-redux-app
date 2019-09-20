import * as actionTypes from './actionTypes'
import { appConstants } from '../constants/constants';
import axios from 'axios';
import _ from 'lodash'
import {getFilmId} from '../components/helpers/core'

export function getRequest(){
	return {
		type:  actionTypes.GET_REQUEST_SUCCESS,
		payload: {}
	}
}


export function getFilmsSuccess(response){
  return {
      type: actionTypes.GET_ALL_FILMS,
      payload: {
          response,
      }
  }
}

export function getAllFilms() {
  return function (dispatch) {
    dispatch(getRequest())
    axios.get(`${appConstants.WEB_SERVICE_URL}/films`)
    .then(response => {
        dispatch(getFilmsSuccess(response.data))
      }).catch(error=> {
        dispatch(createError(error))
      });

  };
}

export function searchData(name){
  return function (dispatch) {
    dispatch(getRequest())
    axios.get(`${appConstants.WEB_SERVICE_URL}/films`)
    .then(response => {
      let results = response.data.results.filter(o => o.title.match(name));
        dispatch(getFilmsSuccess({count: results.length, results: results}))
      }).catch(error=> {
        dispatch(createError(error))
      });

  };
}

export function getFilmSuccess(response){
  return {
      type: actionTypes.GET_PARTICULAR_FILM,
      payload: {
          response,
      }
  }
}

export function getFilm(id) {
  return function (dispatch) {
    dispatch(getRequest())
    axios.get(`${appConstants.WEB_SERVICE_URL}/films/${id}`)
    .then(response => {
        dispatch(getFilmSuccess(response.data))
      }).catch(error=> {
        dispatch(createError(error))
      });

  };
}

export function getHoverRequest(){
  return {
    type:  actionTypes.GET_HOVER_REQUEST,
    payload: {}
  }
}
export function hoverActionSuccess(response){
  return {
      type: actionTypes.HOVER_ACTION_SUCCESS,
      payload: {
          response,
      }
  }
}

export  function hoverAction(item){
  var finalResult = {}
  var urls = []
  return function (dispatch) {
    dispatch(getHoverRequest())
    item.characters.map((url)=> {
      urls.push(axios.get(url))
    })
    // server is very slow response while call 25 request at a time so i'd slice for test

    axios.all(urls.slice(0,2)).then((results) => { 
      let dataArr = results.map((res) => res.data.name)
      finalResult["id"] = getFilmId(item);
      finalResult["characters"] = dataArr;
      dispatch(hoverActionSuccess(finalResult))
    });
  };
}



export  function createError(error){
 return function(dispatch) {  
    dispatch({
      type: actionTypes.GET_RESPONSE_ERROR,
      payload: error
    });
  }
}