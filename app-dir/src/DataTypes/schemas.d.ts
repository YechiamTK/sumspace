/**
 * schemas: FE ts types for mongodb's schemas.
 * 
 * Extends schemas from the generic schema file
 * with essential additional fields for the FE usage.
 */


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

export interface CommentFE extends Omit<Comment, 'comments'> {
  _id: number
  comments?: [CommentFE]
}