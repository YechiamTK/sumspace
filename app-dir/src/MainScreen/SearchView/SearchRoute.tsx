/**
 * SearchRoute: root of the Search tab.
 * provides the layout for the Search tab.
 * 
 */


import { Grid } from "semantic-ui-react"
import { SearchBar } from "./SearchBar"
import { SearchResultsView } from "./SearchResultsView"


export const SearchRoute = ():JSX.Element => {

    return(
        <Grid.Row centered columns={4}>
            <Grid.Column >
                <SearchBar />
                <SearchResultsView />
            </Grid.Column>
        </Grid.Row>
    )
}