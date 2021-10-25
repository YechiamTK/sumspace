import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { NewArticleModal } from "../NewArticleModal";
import { NewSummaryModal } from "../NewSummaryModal";

export const TopBar = ():JSX.Element => {
    
    //For now everyhing below is placeholder.
    //Need to think what I want from Top Bar,
    //and how to differentiate it from Side Bar.

    return (
        <Menu size='large' fixed="top" inverted style={{backgroundColor: "#113240"}}>
            <Menu.Item 
                name="Home"
                as='a'
            >
                <Link to={"/"}>
                Home
                </Link>
            </Menu.Item>
            <Menu.Item 
                name="Messages"
                as='a'
            />
            <Menu.Item 
                name="Explore"
                as='a'
            >
                <Link to={"/explore"}>
                Explore
                </Link>
            </Menu.Item>

            <Menu.Menu position='right'>
                <NewArticleModal />
                <NewSummaryModal />
            </Menu.Menu>
        </Menu>
    )
}