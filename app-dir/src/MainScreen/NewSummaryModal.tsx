import React, { useState } from "react";
import { Button, Form, Menu, Modal } from "semantic-ui-react";


export const NewSummaryModal = ():JSX.Element => {
    
    /**Need to do:
     * 1. Better form -
     * a)   article -> replace Input with Select with Search
     * b)   summary -> disable TextArea sizability
     * c)   tags -> replce Select with MultiSelect (is there?)
     * 2. Connection to db -
     * a)   select articles from db
     * b)   select tags from db
     * c)   post summary to db
     */

    const [show, setShow] = useState(false);

    //obviously placeholder:
    const options = [
        { key: 'm', text: 'Male', value: 'male' },
        { key: 'f', text: 'Female', value: 'female' },
        { key: 'o', text: 'Other', value: 'other' },
      ]

    return(
        <Modal
            onClose={()=>setShow(false)}
            onOpen={()=>{setShow(true)}}
            open={show}
            trigger={
                <Menu.Item name="newpost" as='a'>
                    Post Summary
                </Menu.Item>}
            closeIcon>
                <Modal.Header>
                    Write a new summary!
                </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Input fluid label="Choose the article" />
                        <Form.TextArea label="Write below" />
                        <Form.Select fluid label="Choose relevant tags" options={options} />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button content="Post summary"/>
                </Modal.Actions>
        </Modal>
    )
}