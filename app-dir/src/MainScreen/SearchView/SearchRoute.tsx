import { Grid } from "semantic-ui-react"
import { SearchBar } from "./SearchBar"
import { SearchResultsView } from "./SearchResultsView"


export const SearchRoute = () => {

    return(
        <Grid.Row centered columns={4}>
            <Grid.Column >
                <SearchBar />
                <SearchResultsView />
            </Grid.Column>
        </Grid.Row>
    )
}