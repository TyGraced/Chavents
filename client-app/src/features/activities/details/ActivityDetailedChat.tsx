import { observer } from "mobx-react-lite"
import { Button, Comment, CommentAction, CommentActions, CommentAuthor, CommentAvatar, CommentContent, CommentGroup, CommentMetadata, CommentText, Form, FormTextArea, Header, Segment } from "semantic-ui-react"

export default observer(function ActivityDetailedChat() {
    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{border: 'none'}}
            >
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached>
                <CommentGroup>
                    <Comment>
                        <CommentAvatar src='/assets/user.png' />
                        <CommentContent>
                            <CommentAuthor as='a'>Matt</CommentAuthor>
                            <CommentMetadata>
                                <div>Today at 5:42PM</div>
                            </CommentMetadata>
                            <CommentText>How artistic!</CommentText>
                            <CommentActions>
                                <CommentAction>Reply</CommentAction>
                            </CommentActions>
                        </CommentContent>
                    </Comment>

                    <Comment>
                        <CommentAvatar src='/assets/user.png' />
                        <CommentContent>
                            <CommentAuthor as='a'>Mogbotoluwa Ethan</CommentAuthor>
                            <CommentMetadata>
                                <div>5 days ago</div>
                            </CommentMetadata>
                            <CommentText>Dude, this is awesome. Thanks so much</CommentText>
                            <CommentActions>
                                <CommentAction>Reply</CommentAction>
                            </CommentActions>
                        </CommentContent>
                    </Comment>

                    <Form reply>
                        <FormTextArea/>
                        <Button
                            content='Add Reply'
                            labelPosition='left'
                            icon='edit'
                            primary
                        />
                    </Form>
                </CommentGroup>
            </Segment>
        </>
    )
})