import React from "react";
import { Menu } from "semantic-ui-react";
import { NewArticleModal } from "./NewArticleModal";
import { NewSummaryModal } from "./NewSummaryModal";

type SidebarLeftProps = {
    triggerUpdate: () => void
}

export const SidebarLeft = (props: SidebarLeftProps):JSX.Element => {


    return (
        <Menu size="large" vertical fixed="left" style={{ height: '100vh', top: '10vh', backgroundColor: "#bccad6"}}>
            <NewSummaryModal triggerUpdate={()=>{props.triggerUpdate()}}/>
            <NewArticleModal />
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