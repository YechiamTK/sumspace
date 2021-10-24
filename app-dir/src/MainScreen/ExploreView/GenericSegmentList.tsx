import { Grid, Header, List, Segment } from "semantic-ui-react";

interface SegmentListProps {
    header: string,
    chlidren: JSX.Element[]
}

export const GenericSegmentList = (props: SegmentListProps) => {

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