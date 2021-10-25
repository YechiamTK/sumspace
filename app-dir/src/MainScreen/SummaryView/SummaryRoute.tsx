import React from "react";
import { Card, Grid, Rating } from "semantic-ui-react";
import { usePostsContext } from "../../Context/Store";


export const SummaryRoute = ():JSX.Element => {

    const {state: {selectedPost}} = usePostsContext();

    return(
        <Grid columns={4} verticalAlign="middle" textAlign="center">    {/* idk why verticalAlign doesn't work */}
            <Grid.Row>
                <Grid.Column>
                    <Card raised centered>
                        <Card.Content header={(typeof selectedPost.article === 'object') ? 
                                        selectedPost.article.title /* I NEED TO PUT TITLE FOR SUMMARY!!! */ : '' } />
                        <Card.Content description={selectedPost.summary} />
                        <Card.Content meta={selectedPost.publishDate} />
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
        </Grid>
    );
}