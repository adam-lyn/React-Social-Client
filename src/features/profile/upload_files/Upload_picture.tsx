import React from "react";
import { reverbClientUploadFileWithAuth } from "../../../remote/reverb-api/reverbClient";

export default function Upload_Picture() {
  const [cjsFile, setcjsFile] = React.useState("");
  const submitForm = (event:any) => {
    event.preventDefault();
    const dataArray = new FormData();
    dataArray.append('file', cjsFile);

    try{
      reverbClientUploadFileWithAuth.post("/storage/uploadfile",dataArray);
      console.log("Upload finished")
    }
    catch{
      console.log("upload failed")
    }
  };
  const handleChangeFile = (event:any)=> {
    const file = event.target.files[0];
    let formData = new FormData();
    formData.append('file', file);
    //Make a request to server and send formData
    setcjsFile(file);
  }
  return (
    <div>
      <form onSubmit={submitForm}>
        <input type="file" onChange={(e) => handleChangeFile(e)} />
        <br />
        <input type="submit"/>
      </form>
    </div>
  );
}