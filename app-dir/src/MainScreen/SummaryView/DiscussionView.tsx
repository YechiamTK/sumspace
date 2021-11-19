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


    const postComment = (event: React.FormEvent<HTMLFormElement>, commentText: string) => {
        axios.post("/new-comment",{
            params: {
                userId: user._id,
                commentText: commentText,
                summaryId: props.selectedPost._id
            }
        }).then(async ()=>{
            axios.post('/full-summary',{
                params:{
                    summaryId: props.selectedPost._id
                }
            }).then((response)=>{
                console.log(response.data);
                dispatch({type: 'EXTEND_POST', payload: response.data});
            }).then(()=>{
                setComments(selectedPost.comments ? selectedPost.comments : comments);
            })
        }).catch((err)=>{
            console.log(err);
        });

        event.preventDefault();
    }

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
                                submitFunction={postComment} />

                <ReplyForm submitFunction={postComment} />
                    
            </Comment.Group>
        </Grid.Row>
    );
}