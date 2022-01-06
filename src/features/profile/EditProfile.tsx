import { Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './EditProfile.css';
import { getProfileAsync, selectProfile, updateProfileAsync } from './profileSlice';

export let util = { update: (e: any) => { }, cancel: (e: any) => { } };

export default function EditProfile() {
    const [cjsFile, setcjsFile] = useState("");
    useEffect(() => {
        dispatch(getProfileAsync(profile));
    }, []);

    const profile = useSelector(selectProfile);
    const dispatch = useDispatch();
    const history = useHistory();
    const [input, setInput] = useState(profile);

    const handleChange = (e: any) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    util.update = (e: any) => {

       e.preventDefault();
        // console.log('editProfile' + JSON.stringify(input));
        dispatch(updateProfileAsync(input));
        history.push('/profile');
    }

    util.cancel = (e: any) => {
        e.preventDefault();
        history.push('/profile');
    }

    const handleChangeFile = (event:any)=> {
        const file = event.target.files[0];
        setcjsFile(file);
      }

      return (
        <div>
            <Grid container direction="column" alignItems="center" justify="center">
                <Card id="EditProfile">
                    <Container>
                        <Row>
                            <Col id="editCol1">
                                <div className="form_input-group">
                                    <label htmlFor="firstName">First Name</label>

                                    <input className="form_input" type="text" name="firstName" placeholder="First name" value={input.firstName}
                                        onChange={handleChange} required />
                                </div>

                                <div className="form_input-group">
                                    <label htmlFor="lastName">Last Name</label>

                                    <input className="form_input" type="textbox" name="lastName" placeholder="Last name" value={input.lastName}
                                        onChange={handleChange} required />
                                </div>

                                <div className="form_input-group">
                                    <label htmlFor="aboutMe">About Me</label>
                                    <textarea className="form_input" rows={10} name="aboutMe" placeholder="Your about me" value={input.aboutMe}
                                        onChange={handleChange}  > </textarea>
                                </div>
                            </Col>
                            <Col id="editCol2">
                                <div className="form_input-group">
                                    <label htmlFor="lastName">Birthday</label>
                                    <input className="form_input" type="textbox" name="birthday" placeholder="Birthday" value={input.birthday}

                                        onChange={handleChange} required />
                                </div>

                                <div className="form_input-group">
                                    <label htmlFor="lastName">Hobbies</label>
                                    <input className="form_input" type="textbox" name="hobby" placeholder="Hobby" value={input.hobby}
                                        onChange={handleChange} required />
                                </div>

                                <div className="form_input-group">
                                    <label htmlFor="lastName">Location</label>
                                    <input className="form_input" type="textbox" name="location" placeholder="Location" value={input.location}
                                        onChange={handleChange} required />
                                </div>

                                <div className="form_input-group">
                                    <label htmlFor="profileImg">Select Profile Image</label>
                                    <input className="form_input" type="text" name="profileImg" placeholder="Profile Image url" value={input.profileImg}
                                        onChange={handleChange} required />
                                </div>

                                <div className="form_input-group">
                                    <label htmlFor="headerImg">Select Header Image</label>
                                    <input className="form_input" type="file" name="headerImg" placeholder="Header Image url" value={input.headerImg}
                                        onChange={(e) => handleChangeFile(e)}  required />
                                </div>
                                <br /><br />
                            </Col>
                        </Row>
                        <Row id="editButtonsRow">
                            <Col id="updateProfileBtnCol">
                                <button data-testid="updateButton" id="UpdateProfile" type="submit" onClick={(e) => util.update(e)} >Update</button><br />
                            </Col>
                            <Col id="cancelProfileBtnCol">
                                <button data-testid="cancelButton" id="CancelEdits" type="submit" onClick={(e) => util.cancel(e)} >Cancel</button><br />
                            </Col>
                        </Row>
                    </Container>
                </Card>
            </Grid>
        </div>
    )

}


