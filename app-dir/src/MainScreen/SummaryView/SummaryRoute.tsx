import React, { useEffect } from "react";
import { Card, Grid, Rating } from "semantic-ui-react";
import { usePostsContext } from "../../Context/Store";
import { SummaryView } from "./SummaryView";
import { DiscussionView } from "./DiscussionView";
import axios from "axios";


export const SummaryRoute = ():JSX.Element => {

    const {state: {selectedPost}, dispatch} = usePostsContext();

    useEffect(() => {
        axios.post('full-summary',{
            params:{
                summaryId: selectedPost._id
            }
        }).then((response)=>{
            console.log(response.data);
            dispatch({type: 'SELECT_POST', payload: response.data});
        })
    },[]);

    return(
        <Grid columns={1} verticalAlign="middle" textAlign="center">    {/* idk why verticalAlign doesn't work */}
            <SummaryView selectedPost={selectedPost}/>
            <DiscussionView selectedPost={selectedPost}/>
        </Grid>
    );
}