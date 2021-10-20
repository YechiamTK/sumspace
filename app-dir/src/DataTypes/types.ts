import {Summary, Tag, User} from 'types';


export interface UserFE extends User {
  _id: number
}

export interface SummaryFE extends Summary {
  _id: number
}

export interface TagFE extends Tag {
  _id: number
}