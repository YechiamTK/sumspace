import { createContext, useContext, useReducer } from 'react';
import {UserFE} from '../DataTypes/types';


//TYPES

type State = {
    user: UserFE,
  /*   isLoading: boolean, */
    error: string
};

type Action =
    | {type: 'LOG_IN', payload: UserFE};
    //perhaps more types in the future

type Dispatch = (action: Action) => void;

type StoreProps = {
  children: React.ReactNode
};


//Store Setup

export const initalState = {
    user: Object as unknown as UserFE,
    error: ""
    
};
  
const reducer = ((state: State, action: Action):State => {
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

const UserContext = createContext<{state:State, dispatch: Dispatch} | undefined>(undefined);
  
export const Store = ({children}:StoreProps):JSX.Element => {
  const user:UserFE = {_id:-1, username:"",firstName:"",lastName:"",password:""};
  const [state, dispatch] = useReducer(reducer, {user , error: ""});
  const value = {state, dispatch};
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("useUserContext must be used inside a Provider tag");
  else
    return context;
}