import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { reverbClientWithAuth } from "../../remote/reverb-api/reverbClient";
import { Profile } from '../profile/profile';
import { followUser, getUserIdFromProfileId} from '../follow/followers.api';
import { updateProfile } from '../profile/profile.api';

export default function GoodResult({ user }: any) {
  
  const [ profile, setProfile ] = useState<Profile>();

  //testing erronous force update
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}
const forceUpdate = useForceUpdate();

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
    getUserIdFromProfileId(profile?.id as string).then((userId) => followUser(userId)).then(forceUpdate); //First part of the .then is considered to be the payload of the return of the first call.
    //Button works, but no rerender is called.
  }

  // const followUser = async () => {
  //   const resp = await reverbClientWithAuth.put(`/api/user/follow-user/${user?.key}`);
  // }

  return (
    <div>
      <NavLink
        className='search-result'
        to={"/user_profile/" + profile?.id}
        key={profile?.id}
      >
        <img className='profile-pic-mini' src={profile?.profile_img}/>
        {profile?.first_name}&nbsp;&nbsp;
        {user.label}
      </NavLink>
      <button type='button' className="follow-btn" onClick={handleClick}>
        FOLLOW
      </button>
      <br key={profile?.id + "1"}/>
    </div>
  );
}
