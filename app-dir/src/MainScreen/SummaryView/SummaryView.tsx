/**
 * SummaryView: presents the summary.
 * 
 * @param props SummaryProps: selectedPost-> the currently viewed post
 *  
 */


import React from "react";
import { Card, Grid, Rating } from "semantic-ui-react";
import { SummaryFE } from "../../DataTypes/schemas";

interface SummaryProps{
    selectedPost: SummaryFE
}
export const SummaryView = (props: SummaryProps):JSX.Element => {

    const selectedPost = props.selectedPost;

    return(
        <Grid.Row>
            <Grid.Column width="10">
                <Card raised centered fluid>
                    <Card.Content header={(typeof selectedPost.article === 'object') ? 
                                    selectedPost.article.title /* I NEED TO PUT TITLE FOR SUMMARY!!! */ : '' } />
                    <Card.Content textAlign='left' style={{'white-space': 'pre-wrap'}} description={selectedPost.summary} />
                    <Card.Content textAlign='right' meta={new Date(selectedPost.publishDate).toLocaleString()} />
                    <Card.Content extra textAlign="left">
                        <Rating icon='star' defaultRating={selectedPost.rating} maxRating={5} onRate={()=>{console.log('rated')}} />
                        <span style={{float: "right"}}>{"Likes: "  + selectedPost.likes}</span>
                    </Card.Content>
                    {selectedPost.tags && selectedPost.tags.length > 0 ? 
                        <Card.Content extra>
                            {selectedPost.tags}
                        </Card.Content>
                        :
                        <></>
                    }
                </Card>
            </Grid.Column>
            </Grid.Row>
    );
}