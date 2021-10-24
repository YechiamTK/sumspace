import axios from "axios";
import { useEffect, useState } from "react"
import { List } from "semantic-ui-react"
import { GenericSegmentList } from "./GenericSegmentList";


interface tagJson {
    _id : string | number,
    tagName: string
}

interface authorJson {
    _id : string | number,
    name: string,
    articles?: Array<any>
}


export const ExploreRoute = ():JSX.Element => {

    const [tags, setTags] = useState<Array<tagJson>>([]);
    const [authors, setAuthors] = useState<Array<authorJson>>([]);

    useEffect(()=>{
        axios.get('/get-tags').then((response) => {
            if (response.data !== typeof String)
                setTags(response.data);
            else
                throw new Error(response.data);
        });
    }, []);

    useEffect(()=>{
        axios.get('/get-authors').then((response) => {
            if (response.data !== typeof String)
                setAuthors(response.data);
            else
                throw new Error(response.data);
        });
    }, []);

    return(
        <>
            <GenericSegmentList header="Popular Tags" chlidren={
                tags.map((tag)=>{
                    //I wanted to add <Divider> but for some reason it's fucked up
                    return(
                        <List.Item onClick={() => { console.log('clicked' + tag.tagName); } } key={tag._id}>
                            <List.Header>{tag.tagName}</List.Header>
                        </List.Item>
                    )
                })
            } />
            <GenericSegmentList header="Popular Authors" chlidren={
                authors.map((author)=>{
                    //I wanted to add <Divider> but for some reason it's fucked up
                    return(
                        <List.Item onClick={() => { console.log('clicked' + author.name); } } key={author._id}>
                            <List.Header>{author.name}</List.Header>
                        </List.Item>
                    )
                })
            } />
        </>
    )
}