import {Mongoose} from 'mongoose';


/***
 * Interfaces used for the Schemas.
 */

export interface User {
    username : string,
    firstName : string,
    lastName : string,
    password : string,
    summaries? : Array<Summary>,
    followedAuthors? : Array<Author>,
    followedTags? : Array<Tag>,
    followedUsers? : Array<User>
}

export interface Article {
    title : string,
    author : string,
    publishDate : Date,
    link : string,
    tags? : Array<Tag>
}

export interface Summary { 
    user : User,
    comments? : Array<Comment>,
    rating? : number,
    likes : number,
    publishDate : Date,
    article : Article,
    tags? : Array<Tag>
}

export interface Comment {
    user : User,
    comments? : Array<Comment>,
    likes : number
}

export interface Tag {
    tagName : string
}

export interface Author {
    name : string,
    articles? : Array<Article>
}


/***
 * createUserModel:
 * create a new user model in the database.
 * 
 * @param mongoose Mongoose instance
 * 
 * User schema:
 * 
 * @param firstName
 * @param lastName
 * @param password
 * @param summaries an array of type Summary
 * @param followedAuthors an array of type Author
 * @param followedTags an array of type Tag
 * @param followedUsers an array of type User
 */
export function retrieveUserSchema(mongoose: Mongoose){
    const userScehma = new mongoose.Schema<User>({
        username : { type: String, required: true },
        firstName : { type: String, required: true },
        lastName : { type: String, required: true },
        password : { type: String, required: true },
        summaries : [{type:mongoose.Schema.Types.ObjectId, ref: 'Summary'}],
        followedAuthors : [{type:mongoose.Schema.Types.ObjectId, ref: 'Author'}],
        followedTags : [{type:mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
        followedUsers : [{type:mongoose.Schema.Types.ObjectId, ref: 'User'}]
    });

    return (userScehma);
}

/***
 * createArticleModel:
 * create a new article model in the database.
 * 
 * @param mongoose Mongoose instance
 * 
 * Article schema:
 * 
 * @param title
 * @param author of type Author
 * @param publishDate of type Date
 * @param link
 * @param tags an array of type Tag
 */
export function retrieveArticleModel(mongoose: Mongoose){
    const articleScehma = new mongoose.Schema<Article>({
        title : {type: String, required: true},
        author : {type: String, required: true},
        publishDate : {type: Date, required: true},
        link : {type: String, required: true},
        tags : [{type:mongoose.Schema.Types.ObjectId, ref: 'Tag'}]
    });

    const articleModel = mongoose.model('Article', articleScehma);

    return (articleModel);
}

/***
 * createSummaryModel:
 * create a new summary model in the database.
 * 
 * @param mongoose Mongoose instance
 * 
 * Summary schema:
 * 
 * @param user of type User
 * @param comments an array of type Comment
 * @param rating numerical representation of the summary's worth
 * @param likes
 * @param publishDate of type Date
 * @param article of type Article
 * @param followedUsers an array of type User 
 */
export function retrieveSummaryModel(mongoose: Mongoose){
    const summaryScehma = new mongoose.Schema({
        user : {type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        comments : [{type:mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
        rating : {type: Number, required: true},
        likes : {type: Number, required: true},
        publishDate : {type: Date, required: true},
        article : {type:mongoose.Schema.Types.ObjectId, ref: 'Article', required: true},
        tags : [{type:mongoose.Schema.Types.ObjectId, ref: 'Tag'}]
    });
    
    const summaryModel = mongoose.model('Summary', summaryScehma);

    return (summaryModel);
}


/***
 * createCommentModel:
 * create a new comment model in the database.
 * 
 * @param mongoose Mongoose instance
 * 
 * Comment schema:
 * 
 * @param user of type User
 * @param followedAuthors an array of type Comment
 * @param likes
 */
 export function retrieveCommentModel(mongoose: Mongoose){
    const commentScehma = new mongoose.Schema({
        user : {type:mongoose.Schema.Types.ObjectId, ref: 'User', required : true},
        comments : [{type:mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
        likes : {type: Number, required: true}
    });

    const commentModel = mongoose.model('Comment', commentScehma);

    return (commentModel);
}


/***
 * createTagModel:
 * create a new tag model in the database.
 * 
 * @param mongoose Mongoose instance
 * 
 * Tag schema:
 * 
 * @param tagName
 */
 export function retrieveTagModel(mongoose: Mongoose){
    const tagScehma = new mongoose.Schema({
        tagName : {type: String, required: true}
    });

    const tagModel = mongoose.model('Tag', tagScehma);

    return (tagModel);
}


/***
 * createAuthorModel:
 * create a new author model in the database.
 * 
 * @param mongoose Mongoose instance
 * 
 * Author schema:
 * 
 * @param name
 * @param articles an array of type Article
 */
 export function retrieveAuthorModel(mongoose: Mongoose){
    const authorScehma = new mongoose.Schema({
        name : {type: String, required: true},
        articles : [{type:mongoose.Schema.Types.ObjectId, ref: 'Article'}]
    });

    const authorModel = mongoose.model('Author', authorScehma);

    return (authorModel);
}