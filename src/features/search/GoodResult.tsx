import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { reverbClientWithAuth } from "../../remote/reverb-api/reverbClient";
import { Profile } from '../profile/profile';
import { getProfileAsync, getProfileByIdAsync, selectProfile } from "../profile/profileSlice";
import { canFollow, followUser, unfollowUser } from "../follow/followers.api";

export default function GoodResult({ user }: any) {

  // const [ profile, setProfile ] = useState<Profile>();

  // useEffect(() => { 
  //   const getProfileId = async () => {
  //     if (!profile) {
  //       const resp = await reverbClientWithAuth.get(`/api/profile/getByAuthor/${user.id}`);
  //       setProfile(resp.data);
  //     }
  //   };
  //   getProfileId();
  // }, []);

  const profile = useSelector(selectProfile);
  const [toggleButton, setToggleButton] = useState(false);

  function toggleFollowBtn() {
    if (toggleButton === true){
      setToggleButton(false);
      followUser(profile.user_id).then(async () => {
        updateProfile();
      })
      parseFollowBtn();
    } else {
      setToggleButton(true);
      unfollowUser(profile.user_id).then(async () => {
        updateProfile();
      })
      parseFollowBtn();
    }
  }

  const { id } = useParams();
  const dispatch = useDispatch();

  // Fetches a fresh profile
  function updateProfile() {
    if (id === undefined)
    {
      setTimeout(() => dispatch(getProfileAsync(profile)), 100);
    }
    else setTimeout(() => dispatch(getProfileByIdAsync(id)), 100);
  }

  let buttonName = "FOLLOW";
  const [followBtn, setButton] = useState(buttonName);

  function parseFollowBtn() {
    if (toggleButton === true) {
      setButton(buttonName);
    } else {
      buttonName = "UNFOLLOW";
      setButton(buttonName);
    }
  }

  // const handleClick = () => {
  //   followUser();
  // }

  // const followUser = async () => {
  //   const resp = await reverbClientWithAuth.put(`/api/user/follow-user/${user?.id}`);
  // }

  return (
    <div>
      <NavLink
        className='search-result'
        to={"/profile/" + profile.id}
        key={profile?.id}
      >
        <img className='profile-pic-mini' src={profile.profile_img}/>
        {profile.first_name}&nbsp;&nbsp;
        {user.email}
      </NavLink>
      <button type='button' className="follow-btn" onClick={toggleFollowBtn}>
        {followBtn}
      </button>
      <br key={profile.id + "1"}/>
    </div>
  );
}
