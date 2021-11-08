import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { usePostsContext } from "../../Context/Store";
import { SummaryView } from "./SummaryView";
import { DiscussionView } from "./DiscussionView";
import axios from "axios";
/* 
interface props{
    a: string
}
 */
export const SummaryRoute = (/* props:props */):JSX.Element => {

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
/* 
    useEffect(()=>{
        
    }) */

    /* useEffect(()=>{
        console.log(props.a);
    },[]); */

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