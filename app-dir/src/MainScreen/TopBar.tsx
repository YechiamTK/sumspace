import React from "react";
import { Menu, Sticky } from "semantic-ui-react";


export const TopBar = () => {
    
    //For now everyhing below is placeholder.
    //Need to think what I want from Top Bar,
    //and how to differentiate it from Side Bar.

    return (
        <Sticky>
            <Menu secondary inverted>
                <Menu.Item 
                    name="Home"
                />
                <Menu.Item 
                    name="Messages"
                />
                <Menu.Item 
                    name="Explore"
                />
                <Menu.Item position="right" 
                    name="Search"   //placeholder
                />
            </Menu>
        </Sticky>
    )
}