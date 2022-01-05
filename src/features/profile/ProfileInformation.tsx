import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Button, Card, Stack } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { checkProfileOwnership } from './profile.api';
import { getProfileAsync, getProfileByIdAsync, selectProfile } from './profileSlice';
// import Upload_Pic from './upload_files/Upload_Picture_To_S3';
import Upload_Picture from './upload_files/Upload_picture';

export default function ProfileInformation(props: any) {
    const [doneLoading, setDoneLoading] = React.useState(false);
    const profile = useSelector(selectProfile);
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const [showEditButton, setShowEditButton] = React.useState(false);
    useEffect(() => {
        setDoneLoading(false);
        if(id === undefined) {
            dispatch(getProfileAsync(profile));
            setShowEditButton(true);
            setTimeout(() => setDoneLoading(true), 200);
        } else {
            dispatch(getProfileByIdAsync(id));
            checkProfileOwnership(id).then((owns) => {
                setShowEditButton(owns);
                setTimeout(() => setDoneLoading(true), 200);
            })
        }
      }, [props.beep]); // beep beep :^)
      console.log("profile.profile_img") ;
      if(profile.profile_img == ""){
        // profile.profile_img = "https://cdn3.iconfinder.com/data/icons/materia-human/24/013_042_newborn_infant_child_baby-512.png";
      }
      console.log(profile.profile_img) ;
      console.log("profile.profile_img---2") ;
    const goToEditProfile = () => {
        history.push("/editProfile");
    }
    return(
        doneLoading ? (
        <Grid container direction="column" alignItems="center" justify="center">
        <Card id="ProfilePage">
            <Stack >
                <Card.Img src={profile.profile_img} id="ProfileImg" />
                <Card.Img src={profile.header_img} id="HeaderImg" />
                <Upload_Picture></Upload_Picture>
            </Stack>
            <Card.Body id="profileBody">
                <Card.Title id = "ProfileName">{profile.first_name} {profile.last_name}</Card.Title>
                <br />
                <Card.Text id="AboutMe">
                    <h5>About Me</h5>
                    {profile.about_me}
                </Card.Text>
                <br />
                <Card.Text id="AboutMe">
                    <h5>Fast Facts</h5>
                    Birthday: {profile.birthday}
                    <br />
                    Hobbies: {profile.hobby}
                    <br />
                    Location: {profile.location}
                </Card.Text>
            </Card.Body>
        </Card>
        {showEditButton ? <Button id="EditProfileButton" onClick={goToEditProfile}>Edit Profile</Button> : <></>}
        </Grid>) : (<Image id="LoadingImg" src = {"https://app.revature.com/assets/images/ajax-loader-logo.0cd555cc.gif"}
        style={{height:'192px', width: '300px'}} fluid data-testid="gif"/>)
    )
}