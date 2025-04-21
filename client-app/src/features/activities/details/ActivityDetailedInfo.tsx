import { observer } from "mobx-react-lite"
import { Activity } from "../../../app/models/activity"
import { Grid, GridColumn, Icon, Segment, SegmentGroup } from "semantic-ui-react"
import { format } from "date-fns"

interface Props {
    activity: Activity
}

export default observer(function ActivityDetailedInfo({activity}: Props) {
    return (
        <SegmentGroup>
            <Segment attached='top'>
                <Grid>
                    <GridColumn width={1}>
                        <Icon size='large' color='teal' name='info' />
                    </GridColumn>
                    <GridColumn width={15}>
                        <p>{activity.description}</p>
                    </GridColumn>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <GridColumn width={1}>
                        <Icon name='calendar' size='large' color='teal' />
                    </GridColumn>
                    <GridColumn width={15}>
                        <span>
                            {format(activity.date!, 'dd MMM yyyy h:mm aa')}
                        </span>
                    </GridColumn>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <GridColumn width={1}>
                        <Icon name='marker' size='large' color='teal' />
                    </GridColumn>
                    <GridColumn width={11}>
                        <span>{activity.venue}, {activity.city}</span>
                    </GridColumn>
                </Grid>
            </Segment>
        </SegmentGroup>
    )
})