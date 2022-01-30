/**
 * SearchBar: the search bar of the search view.
 * displays the summaries interactively using partial-search search results.
 * 
 */


import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button, Form, Input, InputProps } from "semantic-ui-react";
import { usePostsContext } from "../../Context/Store";
import { SearchBarStyle } from './SearchBarStyle';


export const SearchBar = ():JSX.Element => {

    const [searchInput, setSearchInput] = useState("");
    const {/* state: {posts},  */dispatch} = usePostsContext();
    const history = useHistory();
    const [barStyleTransition, setBarStyleTransition] = useState(SearchBarStyle().transitionDown);
    const setTransform = SearchBarStyle().setTransform;
    console.log(setTransform);
    console.log(barStyleTransition);


    const searchInputChange = (event: InputProps) => {
        const target = event.target as unknown as InputProps; 
        setSearchInput(target.value);
    }

    const fetchResults = (event: FormEvent<HTMLFormElement>) => {
        axios.get('/summaries',{
            params:
            {
                search: searchInput
            }
        }).then((response)=>{
            console.log(response.data);
            if (barStyleTransition != SearchBarStyle().resetTransform) {
                setBarStyleTransition(SearchBarStyle().resetTransform);
                setTimeout(()=>dispatch({type: 'GET_POSTS', payload: response.data}), 500);
            }
            else
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
            if (location.pathname == "/") {
                dispatch({type: 'EMPTY_POSTS'})
                if (barStyleTransition == SearchBarStyle().resetTransform)
                    setBarStyleTransition(SearchBarStyle().transitionDown)
            }
        });
    }, []);

    return(
        <Form onSubmit={fetchResults} style={{...setTransform, ...barStyleTransition}}>
            <Input
                onChange={searchInputChange}
                value={searchInput}
            />
            <Button type="submit">Search</Button>
        </Form>
    );
}