import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Feed } from "semantic-ui-react";


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

type MainViewProps = {
    updateSummaries: boolean,
    triggerUpdate : ()=>void
}

//Might divide this into a smaller "FeedView" tsx
//And put it here with more context, if there is.
export const MainView = (props: MainViewProps):JSX.Element => {

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
    const [skip, setSkip] = useState(5);
    const [reload, setReload] = useState(false);
    
    const retrieveSummaries = async (amount: number | boolean, skip: number) => {
        await axios.post('/get-summaries', {
            params:
            {
            amount: amount,
            skip: skip
            }
        }).then((response)=>{
            if (response.data){
                if (summaries.length > 0){
                    setSummaries([...response.data, ...summaries]);
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

    useEffect(()=>{
        setSummaries([]);
        setSkip(5);
        retrieveSummaries(5,0);
        //props.triggerUpdate();
    }, [!props.updateSummaries]);

    const date = new Date();
    return(
        <Feed size="large">
            <Button onClick={()=>{retrieveSummaries(5,skip+1), setSkip(skip + 5)}} label="load" />
            {/* <Button onClick={()=>{new Promise(()=>{setSummaries([])}).then(()=>{retrieveSummaries(5,0)}).then(()=>{setSkip(5)}).then(()=>{})}} label="reload" />
             */}
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
            
            <Feed.Event>
                <Feed.Label image={"./img/profile.jpg"}/>
                <Feed.Content
                    date={date.toLocaleTimeString()}
                    summary="New summary published"
                    extraText="New summary x for article y"
                />
            </Feed.Event>
            <Feed.Event>
                <Feed.Label image={"./img/profile.jpg"}/>
                <Feed.Content
                    date={date.toLocaleTimeString()}
                    summary="New summary published"
                    extraText="New summary x for article y"
                />
            </Feed.Event>
            <Feed.Event>
                <Feed.Label image={"../img/profile.jpg"}/>
                <Feed.Content
                    date={date.toLocaleTimeString()}
                    summary="New summary published"
                    extraText="New summary x for article y"
                />
            </Feed.Event><Feed.Event>
                <Feed.Label image={"../img/profile.jpg"}/>
                <Feed.Content
                    date={date.toLocaleTimeString()}
                    summary="New summary published"
                    extraText="New summary x for article y"
                />
            </Feed.Event>
            <Feed.Event>
                <Feed.Label image={"../img/profile.jpg"}/>
                <Feed.Content
                    date={date.toLocaleTimeString()}
                    summary="New summary published"
                    extraText="New summary x for article y"
                />
            </Feed.Event>
            <Feed.Event>
                <Feed.Label image={"../img/profile.jpg"}/>
                <Feed.Content
                    date={date.toLocaleTimeString()}
                    summary="New summary published"
                    extraText="New summary x for article y"
                />
            </Feed.Event>
            <Feed.Event>
                <Feed.Label image={"../img/profile.jpg"}/>
                <Feed.Content
                    date={date.toLocaleTimeString()}
                    summary="New summary published"
                    extraText="New summary x for article y"
                />
            </Feed.Event>
            <Feed.Event>
                <Feed.Label image={"../img/profile.jpg"}/>
                <Feed.Content
                    date={date.toLocaleTimeString()}
                    summary="New summary published"
                    extraText="New summary x for article y"
                />
            </Feed.Event>
            <Feed.Event>
                <Feed.Label image={"../img/profile.jpg"}/>
                <Feed.Content
                    date={date.toLocaleTimeString()}
                    summary="New summary published"
                    extraText="New summary x for article y"
                />
            </Feed.Event>
            <Feed.Event>
                <Feed.Label image={"../img/profile.jpg"}/>
                <Feed.Content
                    date={date.toLocaleTimeString()}
                    summary="New summary published"
                    extraText="New summary x for article y"
                />
            </Feed.Event>
        </Feed>
    )
}