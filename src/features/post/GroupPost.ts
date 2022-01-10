import { Profile } from "../profile/profile";
import { Comment } from "../comment/comment";

export interface GroupPost {
    id: string,
    title: string,
    postText: string,
    contentLink: string,
    contentType: string,
    date: Date | null,
    comments: Comment[],
    authorID: string,
    groupID: string
}

export const initialPost: GroupPost = {
    id: "",
    title: "",
    postText: "",
    contentLink: "",
    contentType:"",
    date: null,
    comments: [],
    authorID: "",
    groupID: ""
}
