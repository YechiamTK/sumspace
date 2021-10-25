import { createContext } from "react";
import { postsState, Action, Dispatch } from "../DataTypes/context";

export const postsInitalState:postsState = {
    posts: [{_id:-1, user:-1, summary: "", likes: 0, rating: 0, publishDate: new Date(), article: -1}],
    selectedPost: {_id:-1, user:-1, summary: "", likes: 0, rating: 0, publishDate: new Date(), article: -1},
    tags: [{_id: -1, tagName: ""}],
    error: ""
};
  
export const postsReducer = ((state: postsState, action: Action):postsState => {
    switch (action.type){
      case 'GET_POSTS':
        return{
          ...state,
          posts: action.payload
        };
      case 'SELECT_POST':
        return{
          ...state,
          selectedPost: action.payload
        };
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
});

export const PostsContext = createContext<{state:postsState, dispatch: Dispatch} | undefined>(undefined);