import React from "react";
import { reverbClientUploadFileWithAuth } from "../../../remote/reverb-api/reverbClient";

export default function Upload_Picture() {
  const [firstName, setFirstName] = React.useState("");
  const [cjsFile, setcjsFile] = React.useState("");
  const [cjsFile2, setcjsFile2] = React.useState("");
  const submitForm = (event:any) => {
    event.preventDefault();
    const dataArray = new FormData();
    dataArray.append('file', cjsFile);
    dataArray.append('file2', cjsFile2);
    dataArray.append("firstName", firstName);

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
    setcjsFile(file);
  }
  const handleChangeFile2 = (event:any)=> {
    const file2 = event.target.files[0];
    setcjsFile2(file2);
  }
  return (
    <div>
      <form onSubmit={submitForm}>
      <input
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          placeholder={"firstName"}
        />
        <br />
             <input type="file" onChange={(e) => handleChangeFile(e)} />
        <br />
        <input type="file" onChange={(e) => handleChangeFile2(e)} />
        <br />
        <input type="submit"/>
      </form>
    </div>
  );
}