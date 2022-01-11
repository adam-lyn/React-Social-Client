import { useParams } from "react-router";
import ProfileInformation from "./ProfileInformation";
import SearchBar from "../search/SearchBar";

export default function ProfilePage(props: any) {
  console.log(useParams())
  return(
    <>
      <SearchBar />
      <ProfileInformation beep={props.beep}/>
    </>
  )
}
