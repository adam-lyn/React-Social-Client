import { async } from "@firebase/util";
import { reverbClientWithAuth } from "../../remote/reverb-api/reverbClient";
import { Bookmarks } from "./bookmarks";

export const getNumBookmarks = async (postId: string): Promise<number> => {
    const { data } = await reverbClientWithAuth.get<number>('api/bookmarks/get-number-of-bookmarks/'+ postId);
    return data;
}

export const bookmarkPost = async (postId: string) => {
    reverbClientWithAuth.put<void>('/api/bookmark/bookmark-post/'+postId);
}

export const removeBookmark = async (postId: string) => {
    reverbClientWithAuth.delete<void>('api/bookmark/remove-bookmark/'+postId)
}

export const checkIfPostCanBeBookmarked = async (postId:string)=> {
    const { data: canBookmark } = await reverbClientWithAuth.get<boolean>('api/bookmark/check-if-bookmarked/'+ postId);
    return canBookmark;
}

export const getAllBookmarksForAuthUser = async () =>{
    const { data } = await reverbClientWithAuth.get<Array<Bookmarks>>('api/bookmark/get-all-bookmarks');
    return data;
}