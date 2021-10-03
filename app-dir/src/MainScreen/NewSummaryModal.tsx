import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form, InputProps, Menu, Modal } from "semantic-ui-react";


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
    const [authorName, setAuthorName] = useState('');

    const authorInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target as unknown as InputProps; 
        setAuthorName(target.value);
    }

    const postNewAuthor = (event: FormEvent<HTMLFormElement>) => {
        axios.post('/new-author', {
          params: {
            name: authorName,
          }
        }).then((response)=>{
          console.log("Received response for author named: " + response.data);
          //props.loginAction();
        }).catch((err)=>{
          console.log("An Error has occured!");
          console.log(err);
        });
      
        event.preventDefault();
    }

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
                    <Form id="submit-form" onSubmit={postNewAuthor}>
                        <Form.Input fluid label="Choose the article" value={authorName} onChange={authorInputChange} />
                        {/* <Form.TextArea label="Write below" />
                        <Form.Select fluid label="Choose relevant tags" options={options} /> */}
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button type="submit" form="submit-form" content="Post summary"/>
                </Modal.Actions>
        </Modal>
    )
}