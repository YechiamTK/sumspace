/**
 * Layout: the very bare-boned layout of the app.
 * puts all of the different tabs in place.
 * uses react-router's api.
 * 
 */


import React from "react";
import { Container, Grid } from "semantic-ui-react";
import { TopBar } from "./TopBar/TopBar";
import { Route } from 'react-router-dom';
import { SearchRoute } from "./SearchView/SearchRoute";
import { ExploreRoute } from "./ExploreView/ExploreRoute";
import { Switch } from "react-router";
import { SummaryRoute } from "./SummaryView/SummaryRoute";


export const Layout = ():JSX.Element => {

    return (
        <Container fluid>
            <Grid.Row>
                <TopBar />
            </Grid.Row>
            <Grid style={{position: 'relative', top: '13vh'}}>
                {/* <Grid.Column width={4}>
                    <SidebarLeft triggerUpdate={()=>{setTriggerUpdate(true)}} />
                </Grid.Column> */}
                <Switch>
                    <Route exact path="/">
                        <SearchRoute />
                    </Route>
                    <Route path="/explore">
                        <ExploreRoute />
                    </Route>
                    <Route path="/summary">
                        <SummaryRoute />
                    </Route>
                </Switch>
                {/* <Grid.Column width={4}>
                    <SidebarRight />
                </Grid.Column> */}
            </Grid>
        </Container>
    )
}