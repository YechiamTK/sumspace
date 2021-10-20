import { List } from "semantic-ui-react";
import { usePostsContext } from "../../Context/Store";



export const SearchResultsView = ():JSX.Element => {

    const {state: {posts}} = usePostsContext();

    return (
        <List>
            {posts.map((post)=>{
                <List.Item>
                    <List.Content>
                        <List.Header>Summary for article {post.article}</List.Header>
                        <List.Description>{post.summary}</List.Description>
                    </List.Content>
                </List.Item>
            })}
        </List>
    )
}