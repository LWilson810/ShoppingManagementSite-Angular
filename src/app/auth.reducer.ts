import {
INCREMENT,
DECREMENT,
SET_CURRENT_USER,
SET_CURRENT_PAGE,
SET_ALL_IMG

} from './auth.action';
import { AppState } from './app.state'
import isEmpty from './validation/is-empty'
import { Action } from './app.state'

 
 import {
   //  Action,
    Reducer,
    } from 'redux';
const initialState: AppState = { counter: 0, isAuthenticated: false, user: '', curPage: 0 , img: []};
 // Create our reducer that will handle changes to the state
 export const authReducer: Reducer<AppState> =
 (state: AppState = initialState, action: Action): AppState => {
 switch (action.type)  {
 case INCREMENT:
 return Object.assign({}, state, { counter: state.counter + 1 });
 case DECREMENT:
 return Object.assign({}, state, { counter: state.counter - 1 });
 case SET_CURRENT_USER:
    return Object.assign({}, state, { isAuthenticated: !isEmpty(action.payload), user: action.payload });
case SET_CURRENT_PAGE:
return Object.assign({}, state, { curPage: action.payload });
case SET_ALL_IMG:
  return Object.assign({}, state, { img: action.payload });
 default:
 return state;
 }
 };