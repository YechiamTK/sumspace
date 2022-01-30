/**
 * DiscussionView: layout for the discussion feed.
 * renders the discussion feed and provides the reply functionality.
 * 
 * Requires props:
 *  - selectedPost - the currently viewed post
 * 
 */


import axios from 'axios';
import { useEffect, useState } from 'react';
import { Comment, Grid, Header } from 'semantic-ui-react';
import { usePostsContext, useUserContext } from '../../Context/Store';
import { SummaryFE, CommentFE } from '../../DataTypes/schemas';
import { CommentsListMemo } from './CommentsList';
import { ReplyForm } from './ReplyForm';

interface SummaryProps{
    selectedPost: SummaryFE
}

export const DiscussionView = (props: SummaryProps):JSX.Element => {

    const {state: {user}} = useUserContext();
    const {state: {selectedPost}, dispatch} = usePostsContext();
    const [comments, setComments] = useState(
        (selectedPost.comments && selectedPost.comments.length > 0 ? 
            selectedPost.comments
            :
            new Array<CommentFE>()
    ));


    /**
     * postComment
     * 
     * if this is a first-order comment, there's a simple 'new-comment'
     * function in the BE. but if it's a deeply nested comment, we would 
     * send it to a more complex 'new-reply-comment' function.
     * 
     * 
     * @param event the form event from which the reply is made 
     * @param commentText the actual comment's text
     * @param level how deeply nested the comment is (children, children of children...)
     * @param commentsIds the ancestors of the comment (if there are any)
     */
    const postComment = (event: React.FormEvent<HTMLFormElement>, commentText: string, level?: number, commentsIds?: Array<number | string>) => {
        if (level) {
            console.log(commentsIds);
            axios.put(`/summaries/${props.selectedPost._id}/comments/ancestors/${JSON.stringify(commentsIds)}`,{
                params: {
                    userId: user._id,
                    commentText: commentText,
                    level: level
                }
            }).then(async ()=>{
                axios.get(`/summaries/${props.selectedPost._id}`).then((response)=>{
                    console.log(response.data);
                    dispatch({type: 'EXTEND_POST', payload: response.data});
                }).then(()=>{
                    setComments(selectedPost.comments ? selectedPost.comments : comments);
                })
            }).catch((err)=>{
                console.log(err);
            });
        }
        else {
            axios.put(`/summaries/${props.selectedPost._id}/comments/`,{
                params: {
                    userId: user._id,
                    commentText: commentText
                }
            }).then(async ()=>{
                axios.get(`/summaries/${props.selectedPost._id}`).then((response)=>{
                    console.log(response.data);
                    dispatch({type: 'EXTEND_POST', payload: response.data});
                }).then(()=>{
                    setComments(selectedPost.comments ? selectedPost.comments : comments);
                })
            }).catch((err)=>{
                console.log(err);
            });
        }

        event.preventDefault();
    }

    //make sure our discussion feed is up-to-date
    useEffect(() => {
        console.log("comments changed!");
        if (comments != selectedPost.comments)
            setComments(selectedPost.comments ? selectedPost.comments : comments);
    },[selectedPost],);

    return (
        <Grid.Row>
            <Comment.Group threaded>
                <Header as="h3" dividing>
                    Comments
                </Header>
                
                <CommentsListMemo comments={comments} 
                                reply={ReplyForm}
                                submitFunction={postComment}
                                level={1} />

                <ReplyForm submitFunction={postComment} />
                    
            </Comment.Group>
        </Grid.Row>
    );
}