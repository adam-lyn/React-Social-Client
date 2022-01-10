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

interface IGroupProp {
    name: string | undefined
}

export default function GroupInformation(props: IGroupProp) {

    const [doneLoading, setDoneLoading] = useState(false);
    const history = useHistory();
    const [groupInfo, setGroupInfo] = useState({} as Group);
    const user = useSelector(selectUser);

    function getGroupInformation(name: string | undefined) {
        if(name) {
           getGroupByName(name).then((data) => setGroupInfo(data)).then(() => setDoneLoading(true));
        }
    }

    useEffect(() => {
        getGroupInformation(props.name);
    }, [])

    function goToEditGroup() {
        history.push(`/editGroup/${props.name}`);
    }

    return(
        doneLoading ? (
        <Grid container direction="column" alignItems="center" justify="center">
        <Card id="ProfilePage">
            <Stack >
                <Card.Img src={groupInfo.profilePic} id="ProfileImg" />
                <Card.Img src={groupInfo.headerImg} id="HeaderImg" />
            </Stack>
            <br />
            <Card.Body id="profileBody">
                <Card.Title id = "ProfileName">{groupInfo.name}</Card.Title>
                <br /><br />
                <Card.Text id="AboutMe">
                    <h5>Description</h5>
                    {groupInfo.description}
                </Card.Text>
            </Card.Body>
        </Card> 
        {groupInfo.owner.id === user.id && groupInfo.owner.email === user.email && <Button id="EditProfileButton" onClick={goToEditGroup}>Edit Profile</Button>}
        </Grid>)
        : (<Image id="LoadingImg" src = {"https://app.revature.com/assets/images/ajax-loader-logo.0cd555cc.gif"} 
        style={{height:'192px', width: '300px'}} fluid data-testid="gif"/>)

    )
}