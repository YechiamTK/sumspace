/**
 * SummaryView: presents the summary.
 * 
 * @param props SummaryProps: selectedPost-> the currently viewed post
 *  
 */


import axios from "axios";
import React, { useEffect } from "react";
import { Card, Grid, Icon, Rating, RatingProps } from "semantic-ui-react";
import { usePostsContext } from "../../Context/Store";
import { SummaryFE } from "../../DataTypes/schemas";

interface SummaryProps{
    selectedPost: SummaryFE
}
export const SummaryView = (props: SummaryProps):JSX.Element => {

    const {dispatch} = usePostsContext();
    const selectedPost = props.selectedPost;
    //console.log("current rating: " + selectedPost.rating[0]);

    const rate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, data: RatingProps) => {
        axios.post('/rate-summary', {
            params:
            {
                summaryId: selectedPost._id,
                rating: data.rating
            }
        }).then((response)=>{
            console.log("rated " + response.data.rating + "stars!");
            //I need to understand how to simply useEffect it always
            axios.post('/full-summary',{
                params:{
                    summaryId: selectedPost._id
                }
            }).then((response)=>{
                console.log(response.data);
                dispatch({type: 'EXTEND_POST', payload: response.data});
            })
        })
    }

    const like = () => {
        axios.post('/like-summary', {
            params:
            {
                summaryId: selectedPost._id
            }
        }).then((response)=>{
            console.log(response.data.likes + "likes!");
            //I need to understand how to simply useEffect it always
            axios.post('/full-summary',{
                params:{
                    summaryId: selectedPost._id
                }
            }).then((response)=>{
                console.log(response.data);
                dispatch({type: 'EXTEND_POST', payload: response.data});
            })
        })
    }

    return(
        <Grid.Row>
            <Grid.Column width="10">
                <Card raised centered fluid>
                    <Card.Content header={(typeof selectedPost.article === 'object') ? 
                                    selectedPost.article.title /* I NEED TO PUT TITLE FOR SUMMARY!!! */ : '' } />
                    <Card.Content textAlign='left' style={{'white-space': 'pre-wrap'}} description={selectedPost.summary} />
                    <Card.Content textAlign='right' meta={new Date(selectedPost.publishDate).toLocaleString()} />
                    <Card.Content extra textAlign="left">
                        <Rating icon='star' defaultRating={selectedPost.rating[0]} maxRating={5} onRate={rate} />
                        <span style={{float: "right"}}>
                            <Icon name='like' onClick={like} />
                            {selectedPost.likes + " Likes"}
                        </span>
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