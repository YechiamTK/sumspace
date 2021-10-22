import {UserFE, SummaryFE, TagFE} from './schemas';

//TYPES

export type userState = {
    user: UserFE,
  /*   isLoading: boolean, */
    error: string
};

export type postsState = {
    posts: SummaryFE[],
    tags: TagFE[],
    error?: string | undefined
}

export type Action =
    | {type: 'LOG_IN', payload: UserFE}
    | {type: 'GET_POSTS', payload: SummaryFE[]};
    //perhaps more types in the future

export type Dispatch = (action: Action) => void;

export type StoreProps = {
  children: React.ReactNode
};