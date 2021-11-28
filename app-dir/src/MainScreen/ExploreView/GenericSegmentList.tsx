/**
 * GenericSegmentList: a very generic segmented list view.
 * perhaps should be moved to Generics. Currently only used
 * in ExploreView's ExploreRoute.
 * 
 * Requires props:
 *  - header - as string
 *  - children - the actual data, as JSX.Element[]
 * 
 */


import { Grid, Header, List, Segment } from "semantic-ui-react";

interface SegmentListProps {
    header: string,
    chlidren: JSX.Element[]
}

export const GenericSegmentList = (props: SegmentListProps):JSX.Element => {

    return (
        <Grid.Row centered columns={4}>
            <Grid.Column >
                <Segment>
                    <Header textAlign="center">{props.header}</Header>
                    <List horizontal>
                        {props.chlidren}
                    </List>
                </Segment>
            </Grid.Column>
        </Grid.Row>
    );
};