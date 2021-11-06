import {Comment, Summary, Tag, User} from 'generic_schema_types';


export interface UserFE extends User {
  _id: number
}

export interface SummaryFE extends Omit<Summary, 'comments'> {
  _id: number
  comments?: [CommentFE]
}

export interface TagFE extends Tag {
  _id: number
}

export interface CommentFE extends Comment {
  _id: number
}