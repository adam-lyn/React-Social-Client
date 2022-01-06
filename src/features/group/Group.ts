import { Profile } from "../profile/profile";

export interface Group {

    owner : Profile
    name : string
    description : string
    headerImg : string
    profilePic : string
    joinedUsers : Profile[]

}