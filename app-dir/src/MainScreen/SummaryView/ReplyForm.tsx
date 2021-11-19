import React, { useState } from "react";
import { Button, Form, InputProps } from "semantic-ui-react";


export interface replyFormProps{
    submitFunction: (event: React.FormEvent<HTMLFormElement>, reply: string) => void
}

/**
 * ReplyForm: generic reply form. perhaps will move it outside SummaryView
 * and in Generics. accepts an outside submit function.
 * 
 * @param props replyFormProps: submitFunction of type event with reply string 
 * @returns JSX.Element
 */
export const ReplyForm = (props: replyFormProps):JSX.Element => {

    const [replyText, replyTextChange] = useState("");

    const replyTextInputChange = (event: InputProps) => {
        const target = event.target as unknown as InputProps; 
        replyTextChange(target.value);
    }

    return(
        <Form reply onSubmit={(event)=>{props.submitFunction(event, replyText)}}>
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