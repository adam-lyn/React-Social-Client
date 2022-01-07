import { Grid } from "@material-ui/core";
import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { createGroup, editGroup } from "./Group.api";
import UpdateGroupRequest from "./dtos/UpdateGroupRequest";

export function EditGroupPage() {

    const history = useHistory();
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const [groupProfilePic, setGroupProfilePic] = useState("");
    const [groupHeaderImg, setGroupHeaderImg] = useState("");

    const handleChangeName = (e: any) => {
        setGroupName(e.target.value);
    };
    
    const handleChangeDescription = (e: any) => {
        setGroupDescription(e.target.value);
    };

    const handleChangeProfilePic = (e: any) => {
        setGroupProfilePic(e.target.value);
    };
    
    const handleChangeHeaderImage = (e: any) => {
        setGroupHeaderImg(e.target.value);
    };

    const edit = (e: any) => {
        e.preventDefault();
        // console.log('editProfile' + JSON.stringify(input));
        let payload: UpdateGroupRequest = {name: groupName, description: groupDescription, profilePic: groupProfilePic, headerImg: groupHeaderImg};
        editGroup(payload);
        history.push(`/group/${groupName}`);
    }

    const cancel = (e: any) => {
        e.preventDefault();
        history.push('/');
    }

    return (
        <div>
            <Grid container direction="column" alignItems="center" justify="center">
                <Card id="EditProfile">
                    <Container>
                        <Row>
                            <Col id="editCol1">
                                <div className="form_input-group">
                                    <label htmlFor="group_name">Group Name</label>
                                    <input className="form_input" type="text" name="group_name" placeholder="Enter Group Name" onChange={handleChangeName} required />
                                </div>
                                <div className="form_input-group">
                                    <label htmlFor="about_me">Description</label>
                                    <textarea className="form_input" rows={10} name="about_me" placeholder="Group Description" onChange={handleChangeDescription} > </textarea>
                                </div>
                                <div className="form_input-group">
                                    <label htmlFor="profile_pic">Profile Picture</label>
                                    <input className="form_input" type="text" name="profile_pic" placeholder="Profile Picture" onChange={handleChangeProfilePic} />
                                </div>
                                <div className="form_input-group">
                                    <label htmlFor="header_img">Header Image</label>
                                    <input className="form_input" type="text" name="header_img" placeholder="Header Image" onChange={handleChangeHeaderImage} />
                                </div>
                            </Col>
                        </Row>
                        <Row id="editButtonsRow">
                            <Col id="createGroupBtnCol">
                                <button data-testid="updateButton" id="edit_group" type="button" onClick={(e) => edit(e)} >Edit Profile</button><br />
                            </Col>
                            <Col id="cancelGroupBtnCol">
                                <button data-testid="cancelButton" id="cancel_group" type="button" onClick={(e) => cancel(e)} >Cancel</button><br />
                            </Col>
                        </Row>
                    </Container>
                </Card>
            </Grid>
        </div>
    )
}