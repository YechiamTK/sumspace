import { createContext } from "react";
import { userState, Action, Dispatch } from "./context";

export const userInitalState:userState = {
    user: {_id:-1, username:"",firstName:"",lastName:"",password:""},
    error: ""
    
};
  
export const userReducer = ((state: userState, action: Action):userState => {
    switch (action.type){
      case 'LOG_IN':
        return{
          ...state,
          user: action.payload
        };
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
});

export const UserContext = createContext<{state:userState, dispatch: Dispatch} | undefined>(undefined);