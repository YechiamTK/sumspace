import React from "react";
import { Container, Grid, Header } from "semantic-ui-react";
import { MainView } from "./MainView";
import { TopBar } from "./TopBar";


export const Layout = () => {

    return (
        <Container>
            <Grid.Row>
                <TopBar />
            </Grid.Row>
            <Grid columns={3}>
                <Grid.Column width={4}>
                    <Header>SidebarLeft</Header>
                </Grid.Column>
                <Grid.Column width={8}>
                    <MainView />
                </Grid.Column>
                <Grid.Column width={4}>
                    <Header>SidebarRight</Header>
                </Grid.Column>
            </Grid>
        </Container>
    )
}