import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { reverbClientWithAuth } from "../../remote/reverb-api/reverbClient";
import { Profile } from '../profile/profile';
import { getProfile, getProfileById } from '../profile/profile.api';

export default function GoodResult({ user }: any) {
  
  const [ profile, setProfile ] = useState<Profile>();

  useEffect(() => { 
    const getProfileId = async () => {
      if (!profile) {
        const resp = await reverbClientWithAuth.get(`/api/profile/getByAuthor/${user.key}`);
        setProfile(resp.data);
      }
    };
    getProfileId();
  }, []);

  const handleClick = () => {
    followUser();
  }

  const followUser = async () => {
    const resp = await reverbClientWithAuth.put(`/api/user/follow-user/${user?.key}`);
  }

  return (
    <div>
      <NavLink
        className='search-result'
        to={"/profile/" + profile?.id}
        key={profile?.id}
        onClick={()=> console.log("clicked Navlink in Good Result")}
      >
        <img className='profile-pic-mini' src={profile?.profile_img}/>
        {profile?.first_name}&nbsp;&nbsp;
        {user.label}
      </NavLink>
      <button type='button' className="follow-btn" onClick={handleClick}>
        FOLLOW
      </button>
    </div>
  );
}
