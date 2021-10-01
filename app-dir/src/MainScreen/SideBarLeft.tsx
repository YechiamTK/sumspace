import React from "react";
import { Menu } from "semantic-ui-react";


export const SidebarLeft = ():JSX.Element => {

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