import { useState } from 'react';
import {Button, Comment, Form, Grid, Header, InputProps} from 'semantic-ui-react';
import { SummaryFE } from '../../DataTypes/schemas';

interface SummaryProps{
    selectedPost: SummaryFE
}

export const DiscussionView = (props: SummaryProps):JSX.Element => {

    const [addComment, SetAddComment] = useState("");
    
    const AddCommentInputChange = (event: InputProps) => {
        const target = event.target as unknown as InputProps; 
        SetAddComment(target.value);
    }

    return (
        <Grid.Row>
            <Comment.Group threaded>
                <Header as="h3" dividing>
                    Comments
                </Header>
                
                {props.selectedPost.comments && props.selectedPost.comments.length > 0 ? props.selectedPost.comments.map((comment => 
                    {return(
                        <Comment>
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

                <Form reply onSubmit={()=>console.log(addComment)}>
                    <Form.TextArea value={addComment} onChange={AddCommentInputChange}/>
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