import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form, InputProps, Menu, Modal } from "semantic-ui-react";


export const NewArticleModal = ():JSX.Element => {
    
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
    const [articleName, setArticleName] = useState('');
    const [tags, setTags] = useState('');

    //handle input change
    const authorInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target as unknown as InputProps; 
        setAuthorName(target.value);
    }

    const articleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target as unknown as InputProps; 
        setArticleName(target.value);
    }

    const tagsInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target as unknown as InputProps; 
        setTags(target.value);
    }

    const postNewArticle = async (event: FormEvent<HTMLFormElement>) => {

        console.log("entered postNewArticle");

        //first check if author already exists
        //perhaps should move this check to backend
        let authorsList = new Array<string>();
        await axios.get('/get-authors').then((response)=>{
            authorsList = response.data;
            console.log('authors list is: ' + authorsList);
        }).catch((err)=>{
            console.log("An Error has occured!");
            console.log(err);
        }).then(async ()=>{
            //if there's no author with that name, create a new one
            if (!(authorsList.includes(authorName))){
                await axios.post('/new-author', {
                    params: {
                    name: authorName,
                    }
                }).then((response)=>{
                    console.log("Received response for author named: " + response.data);
                }).catch((err)=>{
                    console.log("An Error has occured!");
                    console.log(err);
                });
            }
        }).then(async ()=>{
            //post the article with the author name and relevant tags

            //first replace tags' names with their oids
            const splitTags = tags.split(',');
            console.log('tags are: ' + splitTags + typeof(splitTags));
            await axios.post('/new-tags', {
                params:
                    {tags: splitTags}
            }).then(async (response)=>{
                if (response.data == 'success'){
                    console.log(splitTags);
                    await axios.post('/find-tags-oid', {
                        params: 
                            {requestedTags: splitTags}
                    }).then(async (response)=>{
                        console.log(response.data);
                        await axios.post('/new-article', {
                            params: {
                                title: articleName,
                                author: authorName,
                                publishDate: (new Date().toLocaleDateString()),
                                link: "link",
                                tags: response.data     //should be tags' oids
                            }
                        }).then((response)=>{
                            console.log("Successfully saved article named: " + response.data);
                        }).catch((err)=>{
                            console.log("An Error has occured!");
                            console.log(err);
                        })
                    })
                }
                else console.log("error occured while inserting tags");
            });
        });

        //close the modal
        setShow(false);
      
        event.preventDefault();
    }


    return(
        <Modal
            onClose={()=>setShow(false)}
            onOpen={()=>{setShow(true), setArticleName(''), setAuthorName(''), setTags('')}}
            open={show}
            trigger={
                <Menu.Item name="newarticle" as='a'>
                    Add New Article
                </Menu.Item>}
            closeIcon>
                <Modal.Header>
                    Add a new article
                </Modal.Header>
                <Modal.Content>
                    <Form id="new-article-form" onSubmit={postNewArticle}>
                        <Form.Input fluid label="What is the author name?" value={authorName} onChange={authorInputChange} />
                        <Form.Input fluid label="What is the article's title?" value={articleName} onChange={articleInputChange} />
                        <Form.Input fluid label="Choose relevant tags" value={tags} onChange={tagsInputChange} />
                        {/* <Form.TextArea label="Write below" />
                        <Form.Select fluid label="Choose relevant tags" options={options} /> */}
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button type="submit" form="new-article-form" content="Post summary"/>
                </Modal.Actions>
        </Modal>
    )
}