import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";
import FacebookLogin, { FailResponse, SuccessResponse } from "@greatsumini/react-facebook-login";

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                    Chavents
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome to Chavents' />
                        <Button as={Link} to='/activities' size='huge' inverted>
                            Go to Activities!
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm/>)} size='huge' inverted>
                            Login!
                        </Button>
                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted>
                            Register
                        </Button>
                        <Divider horizontal inverted>Or</Divider>
                        <FacebookLogin
                            appId='736433332072407'
                            onSuccess={(response: SuccessResponse) => {
                                userStore.facebooLogin(response.accessToken)
                                console.log('Login successful!', response);
                            }}
                            onFail={(response: FailResponse) => {
                                console.log('Login Failed!', response)
                            }}
                            className={`ui button facebook huge inverted' ${userStore.fbLoading && 'loading'}`}
                        />
                    </>
                )}

            </Container>
        </Segment>
    )
})