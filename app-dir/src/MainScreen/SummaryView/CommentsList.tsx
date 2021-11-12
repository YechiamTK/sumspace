import React from "react";
import { CommentFE } from "../../DataTypes/schemas";
import { Comment, CommentGroup, Header } from 'semantic-ui-react';


interface CommentsProps{
    comments: CommentFE[]
}

const CommentsList = (props: CommentsProps) => {

    const comments = props.comments;

    return(
        <>
        {comments.length > 0 ? comments.map((comment => 
                    {                     
                        if (comment.comments && comment.comments.length > 0){
                            //obviously only one child down, will need a bit of rewrite to achieve full drill-down
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
                                <CommentGroup>
                                    <CommentsListMemo comments={comment.comments} />
                                </CommentGroup>
                            </Comment>
                            )
                        }
                        else return(
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
        </>
    )
}

export const CommentsListMemo = React.memo(CommentsList);