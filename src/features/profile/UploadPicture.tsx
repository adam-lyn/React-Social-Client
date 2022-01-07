import { useSelector } from "react-redux";
import React from "react";
import {selectProfile} from "./profileSlice";
import { reverbClientUploadFileWithAuth } from "../../remote/reverb-api/reverbClient";

export default function Upload_Picture(targetPicture:any) {
  const [cjsFile, setcjsFile] = React.useState("");
  const profile = useSelector(selectProfile);
  const submitForm = async (event:any) => {
    event.preventDefault();
    const dataArray = new FormData();
    if (targetPicture=="Profile Picture"){dataArray.append('picCate',"profile");}
    else{dataArray.append('picCate',"header");}
    dataArray.append('profileId',profile.id);//need to fix
    dataArray.append('file', cjsFile);
    try{
      let resp= await reverbClientUploadFileWithAuth.post("/storage/test",dataArray);
      console.log(resp.data.toString);
      console.log("Upload finished");
    }
    catch{
      console.log("upload failed")
    }
  };
  const handleChangeFile = (event:any)=> {
    const file = event.target.files[0];
    setcjsFile(file);
  }
  return (
    <div>
      <form onSubmit={submitForm}>
          <input type="file" onChange={(e) => handleChangeFile(e)} />
          <input type="submit" value="upload"/>
      </form>
    </div>
  );
}