import {UserFE, SummaryFE, TagFE} from './schemas';

//TYPES

export type userState = {
    user: UserFE,
  /*   isLoading: boolean, */
    error: string
};

export type postsState = {
    posts: SummaryFE[],
    selectedPostId: number | string,
    selectedPost: SummaryFE,
    tags: TagFE[],
    error?: string | undefined
}

export type Action =
    | {type: 'LOG_IN', payload: UserFE}
    | {type: 'GET_POSTS', payload: SummaryFE[]}
    | {type: 'SELECT_POST', payload: number | string}
    | {type: 'EXTEND_POST', payload: SummaryFE}
    | {type: 'EMPTY_POSTS'};
    //perhaps more types in the future

export type Dispatch = (action: Action) => void;

export type userContext = {
  state: userState;
  dispatch: Dispatch;
}

export type postsContext = {
  state: postsState;
  dispatch: Dispatch;
}

export type StoreProps = {
  children: React.ReactNode
};