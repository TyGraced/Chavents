import { observer } from "mobx-react-lite"
import { Button, Comment, CommentAuthor, CommentAvatar, CommentContent, CommentGroup, CommentMetadata, CommentText, FormTextArea, Header, Loader, Segment } from "semantic-ui-react"
import { useStore } from "../../../app/stores/store";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Field, FieldProps, Form, Formik } from "formik";
import MyTextArea from "../../../app/common/form/MyTextArea";
import * as Yup from 'yup';
import { formatDistanceToNow } from "date-fns";

interface Props {
    activityId: string;
}

export default observer(function ActivityDetailedChat({ activityId }: Props) {
    const { commentStore } = useStore();

    useEffect(() => {
        if (activityId) {
            commentStore.createHubConnection(activityId);
        }
        return () => {
            commentStore.clearComments();
        }
    }, [commentStore, activityId]);

    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{ border: 'none' }}
            >
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached clearing>
                <Formik
                    onSubmit={(values, { resetForm }) =>
                        commentStore.addComment(values).then(() => resetForm())}
                    initialValues={{ body: '' }}
                    validationSchema={Yup.object({
                        body: Yup.string().required()
                    })}
                >
                    {({ isSubmitting, isValid, handleSubmit }) => (
                        <Form className="ui form">
                            <Field name='body'>
                                {(props: FieldProps) => (
                                    <div style={{ position: 'relative' }}>
                                        <Loader active={isSubmitting} />
                                        <textarea
                                            placeholder='Enter your comment (Enter to submit, SHIFT + Enter for new line)'
                                            rows={2}
                                            {...props.field}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter' && e.shiftKey) {
                                                    return;
                                                }
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    isValid && handleSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </Field>
                        </Form>
                    )}
                </Formik>
                <CommentGroup>
                    {commentStore.comments.map(comment => (
                        <Comment>
                            <CommentAvatar src={comment.image || '/assets/user.png'} />
                            <CommentContent>
                                <CommentAuthor as={Link} to={`/profiles/${comment.username}`}>{comment.displayName}</CommentAuthor>
                                <CommentMetadata>
                                    <div>{formatDistanceToNow(comment.createdAt)} ago</div>
                                </CommentMetadata>
                                <CommentText style={{ whiteSpace: 'pre-wrap' }}>{comment.body}</CommentText>
                            </CommentContent>
                        </Comment>
                    ))}

                </CommentGroup>
            </Segment>
        </>
    )
})