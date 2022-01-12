import ProfileInformation from "./ProfileInformation";
import SearchBar from "../search/SearchBar";
import { useParams } from "react-router";

export default function ProfilePage(props: any) {
  return(
    <>
      <SearchBar />
      {console.log(props) }
      {console.log(useParams)}
      <ProfileInformation beep={props.beep}/>
    </>
  )
}
