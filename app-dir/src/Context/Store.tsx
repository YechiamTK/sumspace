import { useContext, useReducer } from 'react';
import { postsContext, StoreProps, userContext } from '../DataTypes/context';
import { PostsContext, postsInitalState, postsReducer } from './PostsContext';
import { UserContext, userInitalState, userReducer } from './UserContext';


//Store Setup
  
export const Store = ({children}:StoreProps):JSX.Element => {
  const [userState, userDispatch] = useReducer(userReducer, userInitalState);
  const [postsState, postsDispatch] = useReducer(postsReducer, postsInitalState);
  const userValue = {state: userState, dispatch: userDispatch};
  const postsValue = {state: postsState, dispatch: postsDispatch};
  return (
    <UserContext.Provider value={userValue}>
      <PostsContext.Provider value={postsValue}>
        {children}
      </PostsContext.Provider>
    </UserContext.Provider>
  );
};

export const useUserContext = ():userContext => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("useUserContext must be used inside a Provider tag");
  else
    return context;
}

export const usePostsContext = ():postsContext => {
  const context = useContext(PostsContext);
  if (context === undefined)
    throw new Error("useUserContext must be used inside a Provider tag");
  else
    return context;
}