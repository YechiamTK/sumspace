/**
 * exported json interfaces for the various schemas.
 * 
 */


/**
 * SummaryJson
 * 
 * @param _id number
 * @param user number
 * @param summary string
 * @param comments Array<number>
 * @param rating number
 * @param likes number
 * @param publishDate Date
 * @param article number
 * @param tags Array<number
 */
export interface SummaryJson {
    _id : number,
    user: number,
    summary: string,
    comments: Array<number>,
    rating: number,
    likes: number,
    publishDate: Date,
    article: number,
    tags: Array<number>
    _v: number
}


/**
 * tagJson
 * 
 * @param _id string | number
 * @param tagName string
 */
export interface tagJson {
    _id : string | number,
    tagName: string
}


/**
 * authorJson
 * 
 * @param _id string | number
 * @param name string
 * @param articles optional; Array<any> {should be Array<Article>}
 */
export interface authorJson {
    _id : string | number,
    name: string,
    articles?: Array<any>
}