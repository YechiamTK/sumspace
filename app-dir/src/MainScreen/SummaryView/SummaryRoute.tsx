/**
 * SummaryRoute: root of the summary view.
 * provides the layout of the view and makes sure
 * our selected post's information is always up-to-date.
 * 
 */


import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { usePostsContext } from "../../Context/Store";
import { SummaryView } from "./SummaryView";
import { DiscussionView } from "./DiscussionView";
import axios from "axios";

export const SummaryRoute = ():JSX.Element => {

    const {state: {selectedPost, selectedPostId}, dispatch} = usePostsContext();

    useEffect(() => {
        console.log(selectedPostId)
        axios.post('/full-summary',{
            params:{
                summaryId: selectedPostId
            }
        }).then((response)=>{
            console.log(response.data);
            dispatch({type: 'EXTEND_POST', payload: response.data});
        })
    },[]);

    return(
        <Grid columns={1} verticalAlign="middle" textAlign="center">    {/* idk why verticalAlign doesn't work */}
            {
                (selectedPost._id == selectedPostId ?
                <><SummaryView selectedPost={selectedPost}/>
                <DiscussionView selectedPost={selectedPost}/></>
                :
                <></>
                )
            }
        </Grid>
    );
}