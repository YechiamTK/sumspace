import axios from 'axios';
import { useEffect, useState } from 'react';
import {Button, Comment, Form, Grid, Header, InputProps} from 'semantic-ui-react';
import { usePostsContext, useUserContext } from '../../Context/Store';
import { SummaryFE, CommentFE } from '../../DataTypes/schemas';
import { CommentsListMemo } from './CommentsList';

interface SummaryProps{
    selectedPost: SummaryFE
}

export const DiscussionView = (props: SummaryProps):JSX.Element => {

    const [commentText, SetcommentText] = useState("");
    const {state: {user}} = useUserContext();
    const {state: {selectedPost}, dispatch} = usePostsContext();
    const [comments, setComments] = useState(
        (selectedPost.comments && selectedPost.comments.length > 0 ? 
            selectedPost.comments
            :
            new Array<CommentFE>()
        ));

    
    const commentTextInputChange = (event: InputProps) => {
        const target = event.target as unknown as InputProps; 
        SetcommentText(target.value);
    }

    const postComment = (event: React.FormEvent<HTMLFormElement>) => {
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
                
                <CommentsListMemo comments={comments} />

                <Form reply onSubmit={postComment}>
                    <Form.TextArea value={commentText} onChange={commentTextInputChange}/>
                    <Button 
                        type="submit"
                        content="Add Reply"
                        icon="edit"
                    />
                </Form>
                    
            </Comment.Group>
        </Grid.Row>
    );
}