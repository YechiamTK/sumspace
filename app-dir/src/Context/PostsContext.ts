/**
 * PostsContext: a Context API methods for posts in the app.
 * 
 * Provides (and exports) several essential methods:
 * - inital state
 * - reducer
 * - context creator
 */


import { createContext } from "react";
import { postsState, Action, Dispatch } from "../DataTypes/context";

export const postsInitalState:postsState = {
    posts: [{_id:-1, user:-1, summary: "", likes: 0, rating: 0, publishDate: new Date(), article: -1}],
    selectedPostId: -1,
    selectedPost: {_id:-1, user:-1, summary: "", likes: 0, rating: 0, publishDate: new Date(), article: -1},
    tags: [{_id: -1, tagName: ""}],
    error: ""
};
  
export const postsReducer = ((state: postsState, action: Action):postsState => {
    switch (action.type){
      /**
       * receives the most essential information of the posts
       */
      case 'GET_POSTS':
        return{
          ...state,
          posts: action.payload
        };
      /**
       * puts the selected post in the context
       */
      case 'SELECT_POST':
      return{
        ...state,
        selectedPostId: action.payload
      };
      /**
       * extends the selected post with all the information
       */
      case 'EXTEND_POST':
        return{
          ...state,
          selectedPost: action.payload
        };
      /**
       * empties the context form assigned posts
       */
      case 'EMPTY_POSTS':
        return{
          ...state,
          posts: []
        }
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
});

export const PostsContext = createContext<{state:postsState, dispatch: Dispatch} | undefined>(undefined);