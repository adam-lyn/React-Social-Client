import React, { useEffect } from "react";
import { Button, Card, Stack } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import Image from 'react-bootstrap/Image'

export default function GroupInformation() {

    const [doneLoading, setDoneLoading] = React.useState(false);
    const history = useHistory();
    const { name } = useParams();
    const [showEditButton, setShowEditButton] = React.useState(false);

    
    

    return null;
}