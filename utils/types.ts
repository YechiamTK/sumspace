
/***
 * Interfaces used for the Schemas.
 */


/**
 * User
 * 
 * extend _id with respected type (oid/string/number)
 */
export interface User {
    //_id? : ObjectId, - to be extended in each dir
    username : string,
    firstName : string,
    lastName : string,
    password : string,
    summaries? : Array<Summary>,
    followedAuthors? : Array<Author>,
    followedTags? : Array<Tag>,
    followedUsers? : Array<User>
}

/**
 * Article
 * 
 * extend _id and _author with respected type (oid/string/number)
 */
export interface Article {
    //_id? : ObjectId, - to be extended in each dir
    title : string,
    //_author : ObjectId, - to be extended in each dir
    publishDate : Date,
    link : string,
    tags? : Array<Tag>
}

/**
 * Summary
 * 
 * extend _id with respected type (oid/string/number)
 */
export interface Summary { 
    //_id? : ObjectId, - to be extended in each dir
    user : User,
    summary: string,
    comments? : Array<Comment>,
    rating? : number,
    likes : number,
    publishDate : Date,
    article : Article,
    tags? : Array<Tag>
}

/**
 * Comment
 * 
 * extend _id with respected type (oid/string/number)
 */
export interface Comment {
    //_id? : ObjectId, - to be extended in each dir
    user : User,
    comments? : Array<Comment>,
    likes : number
}

/**
 * Tag
 * 
 * extend _id with respected type (oid/string/number)
 */
export interface Tag {
    //_id? : ObjectId, - to be extended in each dir
    tagName : string
}

/**
 * Author
 * 
 * extend _id with respected type (oid/string/number)
 */
export interface Author {
    //_id? : ObjectId, - to be extended in each dir
    name : string,
    articles? : Array<Article>
}