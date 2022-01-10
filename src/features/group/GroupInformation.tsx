import React, { useEffect, useState } from "react";
import { Button, Card, Stack } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import Image from 'react-bootstrap/Image'
import { getGroupByName } from "./Group.api";
import { Group } from "./Group";
import { selectUser } from "../login/userSlice";
import Feed from "../feed/Feed";
import { selectGroup, setGroupAsync } from "./groupSlice";
import { useAppDispatch } from "../../app/hooks";


export default function GroupInformation() {
    const history = useHistory();
    const user = useSelector(selectUser);
    const group = useSelector(selectGroup);

    function goToEditGroup() {
        history.push(`/editGroup/${group.name}`);
    }

    return(
        <Grid container direction="column" alignItems="center" justify="center">
        <Card id="ProfilePage">
            <Stack >
                <Card.Img src={group.profilePic} id="ProfileImg" />
                <Card.Img src={group.headerImg} id="HeaderImg" />
            </Stack>
            <br />
            <Card.Body id="profileBody">
                <Card.Title id = "ProfileName">{group.name}</Card.Title>
                <br /><br />
                <Card.Text id="AboutMe">
                    <h5>Description</h5>
                    {group.description}
                </Card.Text>
            </Card.Body>
        </Card> 
        {group.owner.id === user.id && group.owner.email === user.email && <Button id="EditProfileButton" onClick={goToEditGroup}>Edit Profile</Button>}
        </Grid>

    )
}