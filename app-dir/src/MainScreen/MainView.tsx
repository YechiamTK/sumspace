import React from "react";
import { Feed } from "semantic-ui-react";


//Might divide this into a smaller "FeedView" tsx
//And put it here with more context, if there is.
export const MainView = () => {

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
    
    const date = new Date();
    return(
        <Feed>
            <Feed.Event>
                <Feed.Label image={"../img/profile.jpg"}/>
                <Feed.Content
                    date={date.getTime()}
                    summary="New summary published"
                    extraText="New summary x for article y"
                />
            </Feed.Event>
            <Feed.Event>
                <Feed.Label image={"../img/profile.jpg"}/>
                <Feed.Content
                    date={date.getTime()}
                    summary="New summary published"
                    extraText="New summary x for article y"
                />
            </Feed.Event>
            <Feed.Event>
                <Feed.Label image={"../img/profile.jpg"}/>
                <Feed.Content
                    date={date.getTime()}
                    summary="New summary published"
                    extraText="New summary x for article y"
                />
            </Feed.Event><Feed.Event>
                <Feed.Label image={"../img/profile.jpg"}/>
                <Feed.Content
                    date={date.getTime()}
                    summary="New summary published"
                    extraText="New summary x for article y"
                />
            </Feed.Event>
            <Feed.Event>
                <Feed.Label image={"../img/profile.jpg"}/>
                <Feed.Content
                    date={date.getTime()}
                    summary="New summary published"
                    extraText="New summary x for article y"
                />
            </Feed.Event>
            <Feed.Event>
                <Feed.Label image={"../img/profile.jpg"}/>
                <Feed.Content
                    date={date.getTime()}
                    summary="New summary published"
                    extraText="New summary x for article y"
                />
            </Feed.Event>
        </Feed>
    )
}