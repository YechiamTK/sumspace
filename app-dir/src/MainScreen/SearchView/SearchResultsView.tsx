import { Feed } from "semantic-ui-react";
import { usePostsContext } from "../../Context/Store";



export const SearchResultsView = ():JSX.Element => {

    const {state: {posts}} = usePostsContext();

    return (
        <Feed>
            {posts.map((post)=>{
                if (post._id != -1)
                    return( <Feed.Event>
                        <Feed.Label image={"./img/profile.jpg"}/>
                        <Feed.Content style={{whiteSpace: "pre-line"}}
                            date={post.publishDate}
                            summary={post.summary}
                            extraText={"Summary for article " + (typeof post.article==="object" ? post.article.title : '') + '\n' + "By " + post.user}
                        />
                    </Feed.Event>)
            })}
        </Feed>
    )
}