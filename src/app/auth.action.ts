import {
  // Action,
  ActionCreator
  } from 'redux';
  import { Action } from './app.state'

  export const INCREMENT: string = 'INCREMENT';
  export const DECREMENT: string = 'DECREMENT';
  export const SET_CURRENT_USER : string = 'SET_CURRENT_USER';
  export const SET_CURRENT_PAGE: string = 'SET_CURRENT_PAGE';
  export const SET_ALL_IMG: string = 'SET_ALL_IMG';

  
  export const increment: ActionCreator<Action> = () => ({
  type: INCREMENT
  });
  export const setcurrentUser: ActionCreator<Action> = (decoded) => ({
      type: SET_CURRENT_USER,
      payload: decoded
  });
  export const setcurrentPage: ActionCreator<Action> = (decoded) => ({
    type: SET_CURRENT_PAGE,
    payload: decoded
});
export const setAllImg: ActionCreator<Action> = (decoded) => ({
  type: SET_ALL_IMG,
  payload: decoded
});


  export const decrement: ActionCreator<Action> = () => ({
   type: DECREMENT
   })