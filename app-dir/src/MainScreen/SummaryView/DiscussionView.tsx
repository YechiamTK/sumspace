import axios from 'axios';
import { useEffect, useState } from 'react';
import {Button, Comment, Form, Grid, Header, InputProps} from 'semantic-ui-react';
import { usePostsContext, useUserContext } from '../../Context/Store';
import { SummaryFE, CommentFE } from '../../DataTypes/schemas';

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
                //setComments(props.selectedPost.comments ? props.selectedPost.comments : comments);
                //I don't have the energy to deal with the correct implementation now; going the easy way:
                setComments(selectedPost.comments ? selectedPost.comments : comments);
            })
        }).catch((err)=>{
            console.log(err);
        });

        event.preventDefault();
    }

    useEffect(() => {
        //I really don't understand how this keeps getting called !@!@
        console.log("memoized");
        if (comments != selectedPost.comments)
            setComments(selectedPost.comments ? selectedPost.comments : comments);
    },[{selectedPost}],);

    /* useEffect(()=>{
        if (props.selectedPost.comments && props.selectedPost.comments.length > 0)
            setComments(props.selectedPost.comments)
    }, [props.selectedPost.comments]) */

    return (
        <Grid.Row>
            <Comment.Group threaded>
                <Header as="h3" dividing>
                    Comments
                </Header>
                
                {comments.length > 0 ? comments.map((comment => 
                    {
                        //THIS SECTION SHOULD NOT RE-RENDER VIA Form's onChange
                        
                        return(
                        <Comment key={comment._id}>
                            <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' /*need avatar for users?*/ />
                            <Comment.Content>
                                <Comment.Author as='a'>{comment.user.username}</Comment.Author>
                                <Comment.Metadata>
                                <span>{comment.date}</span>
                                </Comment.Metadata>
                                <Comment.Text>{comment.text}</Comment.Text>
                                <Comment.Actions>
                                <a>Reply</a>
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    )
                    })) : 
                        <Header as="h5">
                        No Comments yet...
                        </Header>
                }

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