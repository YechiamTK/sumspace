import axios from 'axios';
import { useEffect, useState } from 'react';
import {Button, Comment, Form, Grid, Header, InputProps} from 'semantic-ui-react';
import { useUserContext } from '../../Context/Store';
import { SummaryFE, CommentFE } from '../../DataTypes/schemas';

interface SummaryProps{
    selectedPost: SummaryFE
}

export const DiscussionView = (props: SummaryProps):JSX.Element => {

    const [commentText, SetcommentText] = useState("");
    const {state: {user}} = useUserContext();
    const [comments, setComments] = useState(
        (props.selectedPost.comments && props.selectedPost.comments.length > 0 ? 
            props.selectedPost.comments
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
        }).then((response)=>{
            //refresh Comment.Group
            //probably use useEffect with watch of selectedPost.comments
            console.log(response.data);
            setComments([...comments, response.data]);
        }).catch((err)=>{
            console.log(err);
        });

        event.preventDefault();
    }

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
                        console.log(comment, comment.date);
                        
                        return(
                        <Comment>
                            <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' /*need avatar for users?*/ />
                            <Comment.Content>
                                <Comment.Author as='a'>{comment.user /* need to populate user to the top summary */}</Comment.Author>
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