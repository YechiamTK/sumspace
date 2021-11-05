import React from "react";
import { Card, Grid, Rating } from "semantic-ui-react";
import { usePostsContext } from "../../Context/Store";
import { SummaryView } from "./SummaryView";
import { DiscussionView } from "./DiscussionView";


export const SummaryRoute = ():JSX.Element => {

    const {state: {selectedPost}} = usePostsContext();

    return(
        <Grid columns={1} verticalAlign="middle" textAlign="center">    {/* idk why verticalAlign doesn't work */}
            <SummaryView selectedPost={selectedPost}/>
            <DiscussionView selectedPost={selectedPost}/>
        </Grid>
    );
}