import { observer } from "mobx-react-lite"
import { Activity } from "../../../app/models/activity"
import { Button, Header, Image, Item, ItemContent, ItemGroup, Label, Segment, SegmentGroup } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { format } from "date-fns"
import { useStore } from "../../../app/stores/store"

const activityImageStyle = {
    filter: 'brightness(30%)'
}

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
}

interface Props {
    activity: Activity
}

export default observer(function ActivityDetailedHeader({ activity }: Props) {
    const { activityStore: { updateAttendance, loading, cancelActivityToggle } } = useStore();
    return (
        <SegmentGroup>
            <Segment basic attached='top' style={{ padding: '0' }}>
                {activity.isCancelled &&
                    <Label style={{ position: 'absolute', zIndex: 1000, left: -14, top: 20 }}
                        ribbon color='red' content='Cancelled' />
                }
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle} />
                <Segment style={activityImageTextStyle} basic>
                    <ItemGroup>
                        <Item>
                            <ItemContent>
                                <Header
                                    size='huge'
                                    content={activity.title}
                                    style={{ color: 'white' }}
                                />
                                <p>{format(activity.date!, 'dd MMM yyyy')}</p>
                                <p>
                                    Hosted by <strong><Link to={`/profiles/${activity.host?.username}`}>{activity.host?.displayName}</Link></strong>
                                </p>
                            </ItemContent>
                        </Item>
                    </ItemGroup>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {activity.isHost ? (
                    <>
                        <Button
                            color={activity.isCancelled ? 'green' : 'red'}
                            floated='left'
                            basic
                            content={activity.isCancelled ? 'Re-activate Activity' : 'Cancel Activity'}
                            onClick={cancelActivityToggle}
                            loading={loading}
                        />
                        <Button as={Link}
                            disabled={activity.isCancelled}
                            to={`/manage/${activity.id}`}
                            color='orange'
                            floated='right'>
                            Manage Event
                        </Button>
                    </>
                ) : activity.isGoing ? (
                    <Button loading={loading} onClick={updateAttendance}>Cancel attendance</Button>
                ) : (
                    <Button disabled={activity.isCancelled}
                        loading={loading} onClick={updateAttendance} color='teal'>
                        Join Activity
                    </Button>
                )}
            </Segment>
        </SegmentGroup>
    )
})