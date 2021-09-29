import React from "react";
import { Grid, Header } from "semantic-ui-react";


export const Layout = () => {

    return (
        <Grid columns={3}>
            <Grid.Column>
                <Header>SidebarLeft</Header>
            </Grid.Column>
            <Grid.Column>
                <Header>Main</Header>
            </Grid.Column>
            <Grid.Column>
                <Header>SidebarRight</Header>
            </Grid.Column>
        </Grid>
    )
}