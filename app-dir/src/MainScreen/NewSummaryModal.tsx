/**
 * NewSummaryModal: a popup modal to insert new summary to the db.
 * 
 * @param props triggerUpdate-> currently not utilized.
 */


import axios from "axios";
import React, { ChangeEvent, FormEvent, SyntheticEvent, useState } from "react";
import { Button, DropdownItemProps, DropdownProps, Form, InputProps, Menu, Modal } from "semantic-ui-react";
import { useUserContext } from "../Context/Store";


type SummaryModalProps = {
    triggerUpdate?: () => void
}
export const NewSummaryModal = (props: SummaryModalProps):JSX.Element => {
    
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
    const [options, setOptions] = useState<Array<DropdownItemProps>>([]);
    const [selectedArticle, setSelectedArticle] = useState('');
    const [summaryText, setSummaryText] = useState('');
    const { state: {user} } = useUserContext();

    const summaryTextInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const target = event.target as unknown as InputProps; 
        setSummaryText(target.value);
    }

    const selectedArticleInputChange = (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        //const target = event.target as unknown as InputProps; 
        setSelectedArticle(data.value?.toString() || '');
        console.log(selectedArticle);
    }

    const postNewSummary = (event: FormEvent<HTMLFormElement>) => {
        console.log("entered postNewSummary");
        axios.post('/summaries', {
          params: {
            userId: user._id,
            summaryText: summaryText,
            rating: [0],
            likes: 0,
            publishDate: new Date().toLocaleDateString(),
            article: selectedArticle
          }
        }).then((response)=>{
          console.log("Received response for author named: " + response.data);
        }).catch((err)=>{
          console.log("An Error has occured!");
          console.log(err);
        });
      
        if (props.triggerUpdate)
            props.triggerUpdate();
        setShow(false);
        event.preventDefault();
    }

    const getArticles = () => {
        let articles = new Array<any>();
        let options = new Array<DropdownItemProps>();
        axios.get('/articles/').then((response)=>{
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
            onOpen={()=>{setShow(true), setSelectedArticle(''), setSummaryText('')}}
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
                    <Form id="submit-summary" onSubmit={postNewSummary}>
                        <Form.Select search scrolling onFocus={getArticles} options={options} fluid label="Choose the article" value={selectedArticle}  onChange={selectedArticleInputChange} />
                        <Form.TextArea label="Write below" value={summaryText} onChange={summaryTextInputChange} />
                        {/* <Form.Select fluid label="Choose relevant tags" options={options} /> */}
                    </Form>
                    {/* <Form id="submit-form" onSubmit={postNewSummary}>
                        <Form.Input fluid label="Choose the article" value={authorName} onChange={authorInputChange} />
                        {/* <Form.TextArea label="Write below" />
                        <Form.Select fluid label="Choose relevant tags" options={options} /> }
                    </Form> */}
                </Modal.Content>
                <Modal.Actions>
                    <Button type="submit" form="submit-summary" content="Post summary"/>
                </Modal.Actions>
        </Modal>
    )
}