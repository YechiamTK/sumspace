import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button, Form, Input, InputProps } from "semantic-ui-react";
import { usePostsContext } from "../../Context/Store";


export const SearchBar = ():JSX.Element => {

    const [searchInput, setSearchInput] = useState("");
    const {/* state: {posts},  */dispatch} = usePostsContext();
    const history = useHistory();


    const searchInputChange = (event: InputProps) => {
        const target = event.target as unknown as InputProps; 
        setSearchInput(target.value);
    }

    const fetchResults = (event: FormEvent<HTMLFormElement>) => {
        axios.post('/get-summaries',{
            params:
            {
                search: searchInput
            }
        }).then((response)=>{
            console.log(response.data);
            dispatch({type: 'GET_POSTS', payload: response.data});
        }).catch((err)=>{
            console.log("An error occured during search: " + err);
        });

        event.preventDefault();
    }

    /* useEffect(()=>{
        console.log("logging from useEffect: " + posts);
        /* if (posts.length > 0){

        } 
    }, [posts]); */

    useEffect(()=>{
        //Unfortunately I need to use `any` type because
        //I think history's types are incorrect.
        history.listen((location: any)=>{
            if (location.pathname == "/")
                dispatch({type: 'EMPTY_POSTS'})
        });
    }, []);

    return(
        <Form onSubmit={fetchResults}>
            <Input
                onChange={searchInputChange}
                value={searchInput}
            />
            <Button type="submit">Search</Button>
        </Form>
    );
}