/**
 * CommentsList: rendering all the comment section, recursively.
 * 
 * Extending ReplyForm's props (except hideForm), and requires
 * the additional props:
 *  - comments - the actual comments, CommentFE[] type
 *  - reply - the reply form to render, a JSX Element (currently 'any')
 * 
 */


import React, { useState } from "react";
import { CommentFE } from "../../DataTypes/schemas";
import { Comment, CommentGroup, Header } from 'semantic-ui-react';
import { replyFormProps } from "./ReplyForm";


interface CommentsProps extends Omit<replyFormProps, "hideForm"> {
    comments: CommentFE[],
    reply: any //I'll figure it out later, should be ReplyForm's type
}

const CommentsList = (props: CommentsProps) => {

    const comments = props.comments;
    const hasComments = comments && comments.length;
    const [replyForm, showReplyForm] = useState([false,0]);
    const thisLevel = props.level;

    /**
     * short explanation:
     * for each comments object (comment.comments) we render the comment.
     * in each comment there's the comment's data and a specific reply form.
     * in each comment there's also possiblity another comments object,
     * so we recursively render the CommentsList again, with the child
     * comments object.
     * also for each reply form there's a show/hide mechanism.
     */
    return(
        <>
        {hasComments ? comments.map((comment => 
                    {                     
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
                                        <a onClick={()=>{
                                            showReplyForm([!replyForm[0], comment._id]);
                                        }}>reply</a>
                                        {replyForm[0] && replyForm[1]==comment._id ? 
                                            (<props.reply 
                                                key={comment._id+1} 
                                                commentsIds={comment.ancestors ? comment.ancestors.concat(comment._id) : [comment._id]}
                                                hideForm={()=>{showReplyForm([!replyForm[0], comment._id])}}
                                                {...props} />
                                            ) 
                                            : <></>
                                        }
                                    </Comment.Actions>
                                </Comment.Content>
                                {comment.comments && comment.comments.length ? 
                                    (
                                    <CommentGroup>
                                        <CommentsListMemo comments={comment.comments} 
                                                        reply={props.reply}
                                                        submitFunction={props.submitFunction}
                                                        level={(thisLevel ? thisLevel + 1 : undefined)} />
                                    </CommentGroup>
                                    )
                                    :
                                    <></>
                                }
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