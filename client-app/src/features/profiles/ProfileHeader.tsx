import { Button, Divider, Grid, GridColumn, Header, Item, ItemContent, ItemGroup, ItemImage, Reveal, RevealContent, Segment, Statistic, StatisticGroup } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";

interface Props {
    profile: Profile;
}

export default observer(function ProfileHeader({profile}: Props) {
    return (
        <Segment>
            <Grid>
                <GridColumn width={12}>
                    <ItemGroup>
                        <Item>
                            <ItemImage avatar size='small' src={profile.image || '/assets/user.png'} />
                            <ItemContent verticalAlign='middle'>
                                <Header as='h1' content={profile.displayName} />
                            </ItemContent>
                        </Item>
                    </ItemGroup>
                </GridColumn>
                <GridColumn width={4}>
                    <StatisticGroup widths={2}>
                        <Statistic label='Followers' value='5' />
                        <Statistic label='Following' value='42' />
                    </StatisticGroup>
                    <Divider />
                    <Reveal animated='move'>
                        <RevealContent visible style={{width: '100%'}}>
                            <Button fluid color='teal' content='Following' />
                        </RevealContent>
                        <RevealContent hidden style={{width: '100%'}}>
                            <Button 
                                fluid 
                                basic
                                color={true ? 'red' : 'green'} 
                                content={true ? 'Unfollow' : 'Follow'} />
                        </RevealContent>
                    </Reveal>
                </GridColumn>
            </Grid>
        </Segment>
    )
})