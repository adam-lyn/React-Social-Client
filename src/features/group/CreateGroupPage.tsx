import { Grid } from "@material-ui/core";
import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { createGroup } from "./Group.api";
import { NewGroupRequest } from "./dtos/NewGroupRequest"

export function CreateGroupPage() {

    const history = useHistory();
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");

    const handleChangeName = (e: any) => {
        setGroupName(e.target.value);
    };
    
    const handleChangeDescription = (e: any) => {
        setGroupDescription(e.target.value);
    };

    const create = (e: any) => {
        e.preventDefault();
        // console.log('editProfile' + JSON.stringify(input));
        let payload: NewGroupRequest = {name: groupName, description: groupDescription};
        createGroup(payload);
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
                                    <label htmlFor="first_name">Group Name</label>
                                    <input className="form_input" type="text" name="group_name" placeholder="Enter Group Name" onChange={handleChangeName} required />
                                </div>
                                <div className="form_input-group">
                                    <label htmlFor="about_me">Description</label>
                                    <textarea className="form_input" rows={10} name="about_me" placeholder="Group Description" onChange={handleChangeDescription}  > </textarea>
                                </div>
                            </Col>
                        </Row>
                        <Row id="editButtonsRow">
                            <Col id="createGroupBtnCol">
                                <button data-testid="updateButton" id="create_group" type="button" onClick={(e) => create(e)} >Create</button><br />
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