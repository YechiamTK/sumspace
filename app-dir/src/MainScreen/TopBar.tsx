import React from "react";
import { Menu, Search } from "semantic-ui-react";


export const TopBar = ():JSX.Element => {
    
    //For now everyhing below is placeholder.
    //Need to think what I want from Top Bar,
    //and how to differentiate it from Side Bar.

    return (
        <Menu size='large' fixed="top" inverted style={{backgroundColor: "#113240"}}>
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
    )
}