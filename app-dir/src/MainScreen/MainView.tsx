import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Feed, Icon } from "semantic-ui-react";
import { useUserContext } from "../Context/Store";

const SKIP = 10;
const AMOUNT = 10;

interface SummaryJson {
    _id : number,
    user: number,
    summary: string,
    comments: Array<number>,
    rating: number,
    likes: number,
    publishDate: Date,
    article: number,
    tags: Array<number>
    _v: number
}

/* type MainViewProps = {
    updateSummaries: boolean,
    triggerUpdate : ()=>void
} */

//Might divide this into a smaller "FeedView" tsx
//And put it here with more context, if there is.
export const MainView = (/* props: MainViewProps */):JSX.Element => {

    //Need to do:
    //1.Get user information -
    //a) followed users, authors and tags
    //b) insert new Feed Event based on new
    //   summaries published from the users,
    //   new articles from the authors, and
    //   new summaries/articles with the 
    //   given tags.
    //Note: perhaps should put each type of
    //      event in different .tsx
    //2.Understand Feed.Meta (buttons) and
    //  Feed.User (what can it be used for?)
    //
    // For now everything below is placeholder.
    
    const [summaries, setSummaries] = useState<Array<SummaryJson>>([]);
    const [skip, setSkip] = useState(SKIP);
    const [loadCount, setLoad] = useState(0);
    const [reloadCount, setReload] = useState(0);
    const {state: {user}} = useUserContext();
    //(will be used later?) for loading content dynamically via scroll:
    //const [loadContent, setLoadContent] = useState(false);
    
    const retrieveSummaries = async (amount: number | boolean, skip: number) => {
        await axios.post('/get-summaries', {
            params:
            {
            id: user._id,
            amount: amount,
            skip: skip
            }
        }).then((response)=>{
            if (response.data != "none"){
                if (summaries.length > 0 && skip > 0){
                    setSummaries([...summaries, ...response.data]);
                }
                else{
                    setSummaries(response.data);
                }
                console.log(summaries);
            }
        }).finally(()=>{
            console.log("skip: " + skip);
        }).catch((err)=>{
            console.log("error: "+ err);
        });
    }


    //I REALLY dislike this solution, but it is what it is

    useEffect(()=>{
        retrieveSummaries(SKIP,0);
        setSkip(SKIP);
    },[reloadCount]);

    useEffect(()=>{
        if (summaries.length > 1){
            retrieveSummaries(AMOUNT,skip + 1);
            setSkip(skip => skip + SKIP);
        }
    }, [loadCount]);

    return(
        //ALL THIS VISIBILITY BS - NOT NOW OK?!

       /*  <Visibility continuous={true} once={false} onPassed={{
            '0%':()=>{(loadContent ? setLoadContent(false): undefined), (loadContent ? console.log('visible') : undefined)},
            '30%':()=>{(!loadContent ? setLoadContent(true): undefined), (!loadContent ? console.log('invisible') : undefined)}}} */
                    /* onBottomVisibleReverse={()=>{setLoadContent(false),console.log('invisible')}}> */

        <Feed size="large">
            {/* <Button onClick={()=>{setLoad(loadCount=>loadCount+1)}} label="load" />
            <Button onClick={()=>{setReload(reloadCount=>reloadCount+1)}} label="reload" /> */}
            <Button animated='vertical' onClick={()=>{setReload(reloadCount=>reloadCount+1)}}>
                <Button.Content visible>Reload</Button.Content>
                <Button.Content hidden><Icon name="sync"/></Button.Content>
            </Button>
            
            {
                summaries.map((summary)=>{
                    return (<Feed.Event key={summary._id}>
                        <Feed.Label image={"./img/profile.jpg"}/>
                        <Feed.Content
                            date={summary.publishDate}
                            summary={summary.summary}
                            extraText={"New summary x for article " + summary.article}  //will need to populate article, comments, tags...
                        />
                    </Feed.Event>)
                    })
            }
            {/* {loadContent ?  */}
            <Button animated='vertical' onClick={()=>{setLoad(loadCount=>loadCount+1)}}>
                <Button.Content visible>Load</Button.Content>
                <Button.Content hidden><Icon name="chevron down"/></Button.Content>
            </Button>
                {/* :
                <></>} */}
            
        </Feed>
        /* </Visibility> */
    )
}