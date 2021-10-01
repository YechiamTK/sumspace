import React from "react";
import { Container, Grid } from "semantic-ui-react";
import { MainView } from "./MainView";
import { SidebarLeft } from "./SideBarLeft";
import { SidebarRight } from "./SideBarRight";
import { TopBar } from "./TopBar";


export const Layout = ():JSX.Element => {

    return (
        <Container fluid>
            <Grid.Row>
                <TopBar />
            </Grid.Row>
            <Grid columns={3} style={{position: 'relative', top: '13vh'}}>
                <Grid.Column width={4}>
                    <SidebarLeft />
                </Grid.Column>
                <Grid.Column width={8}>
                    <MainView />
                </Grid.Column>
                <Grid.Column width={4}>
                    <SidebarRight />
                </Grid.Column>
            </Grid>
        </Container>
    )
}