import React, { useRef } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { reverbClientWithAuth } from '../../../remote/reverb-api/reverbClient'

export let util = {upload_picture: (event: any) => {}};

export default function Upload_picture_2() {

  util.upload_picture = async (event: any) => {
    event.preventDefault();
    reverbClientWithAuth.post("/storage/test");
  }

 
  return (
    <>
      <Button data-testid="submitButton" className="w-100 mt-2" type="submit" onClick={(event) => util.upload_picture(event)}>Upload_picture</Button>
      
      
      </>          
  )
}