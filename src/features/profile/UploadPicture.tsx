import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import {
  getProfileAsync,
  selectProfile,
  updateProfileAsync,
} from "./profileSlice";
import { reverbClientUploadFileWithAuth } from "../../remote/reverb-api/reverbClient";
import { updateFilePic } from "./profile.api";

export default function Upload_Picture(props: any) {
  useEffect(() => {
    dispatch(getProfileAsync(profile));
  }, []);

  const history = useHistory();
  const profile = useSelector(selectProfile);
  const dispatch = useDispatch();
  const [input, setInput] = useState(profile);

  const setKeyValue = (k: any, v: any) => {
    setInput({
      ...input,
      [k]: v,
    });
  };

  const [cjsFile, setcjsFile] = React.useState("");
  const submitForm = (event: any) => {
    event.preventDefault();
    const dataArray = new FormData();
    dataArray.append("file", cjsFile);
    dataArray.append("picCate", props.picCate);
    if (input.id == "") {
      dataArray.append("profileId", "0");
    } else {
      dataArray.append("profileId", input.id);
    }
    try {
      // reverbClientUploadFileWithAuth.post("/storage/uploadfile", dataArray);
      updateFilePic(dataArray).then((data) => {
        console.log(data);
        console.log(data.profileId);

        setKeyValue("id", data.profileId);
        if (data.picCate == "header") {
          setKeyValue("header_img", data.picurl);
        } else {
          setKeyValue("profile_img", data.picurl);
        }
        // dispatch(updateProfileAsync(input));
        history.push('/profile');
      });

      console.log("Upload finished");
      // console.log(input.);
    } catch {
      console.log("upload failed");
    }
  };
  const handleChangeFile = (event: any) => {
    const file = event.target.files[0];
    setcjsFile(file);
  };
  return (
    <div>
      <form onSubmit={submitForm}>
        <label htmlFor="last_name">Add/Change Profile Picture</label>
        <div className="form_input">
          <input type="file" onChange={(e) => handleChangeFile(e)} />
          <input type="submit" />
        </div>
      </form>
    </div>
  );
}
