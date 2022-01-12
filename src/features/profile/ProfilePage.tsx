import ProfileInformation from "./ProfileInformation";
import SearchBar from "../search/SearchBar";
import { useParams } from "react-router";

export default function ProfilePage(props: any) {
  return(
    <>
      <SearchBar />
      <ProfileInformation beep={props.beep}/>
    </>
  )
}
