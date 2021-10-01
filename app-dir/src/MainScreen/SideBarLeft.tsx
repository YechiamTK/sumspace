import React from "react";
import { Container, Menu } from "semantic-ui-react";


export const SidebarLeft = () => {

    return (
        <Menu size="large" vertical fixed="left" style={{ height: '100vh', top: '10vh'}}>
            <Menu.Item name="newpost" as='a'>
                Post Summary
            </Menu.Item>
            <Menu.Item name="more" as='a'>
                More Items
            </Menu.Item>
            <Menu.Item name="more" as='a'>
                More Items
            </Menu.Item>
            <Menu.Item name="more" as='a'>
                More Items
            </Menu.Item>
        </Menu>
    )
}