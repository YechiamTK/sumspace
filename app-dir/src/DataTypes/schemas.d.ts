import {Summary, Tag, User} from 'generic_schema_types';


export interface UserFE extends User {
  _id: number
}

export interface SummaryFE extends Summary {
  _id: number
}

export interface TagFE extends Tag {
  _id: number
}