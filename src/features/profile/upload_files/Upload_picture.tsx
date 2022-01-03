import React from "react";
import axios from "axios";

export default function Upload_picture() {
  const [uploadFile, setUploadFile] = React.useState("");
  const [superHero, setSuperHero] = React.useState("");
  
  const submitForm = (event:any) => {
    event.preventDefault();

    const dataArray = new FormData();
    dataArray.append("superHeroName", superHero);
    dataArray.append("uploadFile", uploadFile);

    axios
      .post("api_url_here", dataArray, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((response) => {
        // successfully uploaded response
      })
      .catch((error) => {
        // error response
      });
  };
  const handleChangeFile = (event:any)=> {
    const file = event.target.files[0];
    let formData = new FormData();
    formData.append('file', file);
    //Make a request to server and send formData
  }
  return (
    <div>
      <form onSubmit={submitForm}>
        <input
          type="text"
          onChange={(e) => setSuperHero(e.target.value)}
          placeholder={"Superhero Name"}
        />
        <br />
        <input type="file" onChange={(e) => handleChangeFile(e)} />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}
