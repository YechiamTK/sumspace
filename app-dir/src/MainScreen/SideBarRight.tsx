import React from "react";
import { Container, Menu } from "semantic-ui-react";


export const SidebarRight = () => {

    return (
        <Menu size="large" vertical fixed="right" style={{ height: '100vh', top: '10vh'}}>
            <Menu.Item name="something" as='a'>
                Something
            </Menu.Item>
            <Menu.Item name="something" as='a'>
                Something
            </Menu.Item>
            <Menu.Item name="something" as='a'>
                Something
            </Menu.Item>
            <Menu.Item name="something" as='a'>
                Something
            </Menu.Item>
        </Menu>
    )
}