/**
 * ReplyForm: generic reply form. perhaps will move it outside SummaryView
 * and in Generics. accepts an outside submit function and a form hiding function.
 * Currently receives props specific to commentsList, but if it's to be generic
 * I'll simply provide this props as a generic otherProps object (goes to the submit function).
 * 
 * @param props replyFormProps: - submitFunction-> of type event with reply string
 *                              - level-> level of the comment (how deeply nested it is)
 *                              - commentsIds-> the ancestors of the comment, if there are any
 *                              - hideForm-> outside function call to automatically hide the form on submit
 * @returns JSX.Element
 */


import React, { useState } from "react";
import { Button, Form, InputProps } from "semantic-ui-react";


export interface replyFormProps{
    level?: number,
    commentsIds?: Array<number | string>,
    submitFunction: (event: React.FormEvent<HTMLFormElement>, reply: string, level?: number, commentdsIds?: Array<number | string>) => void,
    hideForm?: () => void
}

export const ReplyForm = (props: replyFormProps):JSX.Element => {

    const [replyText, replyTextChange] = useState("");

    const replyTextInputChange = (event: InputProps) => {
        const target = event.target as unknown as InputProps; 
        replyTextChange(target.value);
    }

    return(
        <Form reply onSubmit={(event)=>{props.submitFunction(event, replyText, props.level, props.commentsIds), 
                                        props.hideForm ? props.hideForm():undefined}}>
            <Form.TextArea value={replyText} onChange={replyTextInputChange}/>
            <Button 
                type="submit"
                content="Add Reply"
                icon="edit"
            />
        </Form>
    )
}

export const ReplyFormMemo = React.memo(ReplyForm);