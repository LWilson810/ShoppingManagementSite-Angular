// import { GET_ERRORS, SET_CURRENT_USER, GET_PROFILE, PROFILE_LOADING,
//     GET_ALL_QUES_ANS, QUESTION_LOADING, ADD_QUESTION, DELETE_QUESTION, ADD_ANSWER,
//     GET_ALL_NOTIFICATIONS, ADD_NOTIFICATION, GET_NOTIFICATIONS, COUNT_NOTIFICATIONS, NOTIFICATION_LOADING, EDIT_NOTIFICATION, DELETE_NOTIFICATION, GET_CURRENT_NOTIFICATION,
//     GET_ALL_DRAFTARTICLES, ARTICLE_LOADING, GET_ARTICLE, GET_COMMENTS, GET_ARTICLES, KEEP_RECENT, DELETE_ARTICLE, COUNT_ARTICLES, AGREE_ARTICLE, DISAGREE_ARTICLE } from '../actions/types';
  
  import { State } from './state'
  import { Action } from './state';
  
     
  import { Reducer } from 'redux';
  const initialState: State = { 
    number: 0,
  };
     // Create our reducer that will handle changes to the state
  export const AppReducer: Reducer<State> =
    (state: State = initialState, action: Action): State => {
    switch (action.type)  {
      case 'ADD_NUMBER':
        return Object.assign(
          {}, state, 
          { number: state.number + 1 }
        );
      default:
        return state;
     }
  };