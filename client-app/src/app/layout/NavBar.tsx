import { Button, Container, Dropdown, DropdownItem, DropdownMenu, Image, Menu } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function NavBar() {
    const {userStore: {user, logout}} = useStore();
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: 10}}/>
                    Chavents
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name="Activities"/>
                <Menu.Item as={NavLink} to={`/profiles/${user?.username}`} name="Profile"/>
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' positive content='Create Activity' />
                </Menu.Item>       
                <Menu.Item position='right'>
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                    <Dropdown pointing ='top left' text={user?.displayName}>
                        <DropdownMenu>
                            <DropdownItem as={Link} to={`/profiles/${user?.username}`} text='My Profile' icon='user' />
                            <DropdownItem onClick={logout} text='Logout' icon='power' />
                        </DropdownMenu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})