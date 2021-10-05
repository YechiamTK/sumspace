import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, DropdownItemProps, Form, InputProps, Menu, Modal } from "semantic-ui-react";


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
    const [options, setOptions] = useState<Array<DropdownItemProps>>([]);

    const authorInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target as unknown as InputProps; 
        setAuthorName(target.value);
    }

    const postNewSummary = (event: FormEvent<HTMLFormElement>) => {
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

    const getArticles = () => {
        let articles = new Array<any>();
        let options = new Array<DropdownItemProps>();
        axios.get('/get-articles-names', {
            params: {
            }
        }).then((response)=>{
            console.log("Received response: " + response.data);
            articles = response.data;
            console.log("articles are: " + articles);
            return (options);
        }).catch((err)=>{
            console.log("An Error has occured!");
            console.log(err);
        }).finally(()=>{
            options = articles.map((v)=>({'text': v, 'value': v}));
            console.log("options are: " + options);
            setOptions(options);
        });
    }


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
                    <Form id="choose-article" onSubmit={postNewSummary}>
                        <Form.Select search scrolling onFocus={getArticles} options={options} fluid label="Choose the article"/*  onChange={authorInputChange} */ />
                        {/* <Form.TextArea label="Write below" />
                        <Form.Select fluid label="Choose relevant tags" options={options} /> */}
                    </Form>
                    {/* <Form id="submit-form" onSubmit={postNewSummary}>
                        <Form.Input fluid label="Choose the article" value={authorName} onChange={authorInputChange} />
                        {/* <Form.TextArea label="Write below" />
                        <Form.Select fluid label="Choose relevant tags" options={options} /> }
                    </Form> */}
                </Modal.Content>
                <Modal.Actions>
                    <Button type="submit" form="submit-form" content="Post summary"/>
                </Modal.Actions>
        </Modal>
    )
}