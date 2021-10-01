import React from "react";
import { Menu, Search, Sticky } from "semantic-ui-react";


export const TopBar = () => {
    
    //For now everyhing below is placeholder.
    //Need to think what I want from Top Bar,
    //and how to differentiate it from Side Bar.

    return (
        //<Sticky>
            <Menu size='large' fixed="top">
                <Menu.Item 
                    name="Home"
                    as='a'
                />
                <Menu.Item 
                    name="Messages"
                    as='a'
                />
                <Menu.Item 
                    name="Explore"
                    as='a'
                />
                <Menu.Item position="right" 
                    name="Search"   //placeholder
                    as={Search}
                />
            </Menu>
        //</Sticky>
    )
}