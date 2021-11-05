import {Comment, Grid, Header} from 'semantic-ui-react';
import { SummaryFE } from '../../DataTypes/schemas';

interface SummaryProps{
    selectedPost: SummaryFE
}

export const DiscussionView = (props: SummaryProps):JSX.Element => {

    

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
                                <span>Today at 5:42PM</span>
                                </Comment.Metadata>
                                <Comment.Text>{comment.user.firstName /* didn't put text in the schema?!? */}</Comment.Text>
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
                    
            </Comment.Group>
        </Grid.Row>
    );
}