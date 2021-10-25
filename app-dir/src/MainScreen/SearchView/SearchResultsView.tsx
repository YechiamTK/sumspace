import { useHistory } from "react-router";
import { Feed } from "semantic-ui-react";
import { usePostsContext } from "../../Context/Store";
import { SummaryFE } from "../../DataTypes/schemas";



export const SearchResultsView = ():JSX.Element => {

    const {state: {posts}, dispatch} = usePostsContext();

    const selectPost = (post: SummaryFE) => {
        //dispatch()
    }

    const history = useHistory();

    return (
        <Feed>
            {posts.map((post)=>{
                if (post._id != -1)
                    return( <Feed.Event onClick={()=>{dispatch({type: 'SELECT_POST', payload: post}), history.push("/summary")}}>
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