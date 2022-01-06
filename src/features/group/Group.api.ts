import { reverbClientWithAuth } from "../../remote/reverb-api/reverbClient";
import { NewGroupRequest } from "./dtos/NewGroupRequest";
import { Group } from "./Group";

export const createGroup = async (newGroup: NewGroupRequest): Promise<Group> => {
    const group = await reverbClientWithAuth.post<Group>('/api/group/', newGroup);
    
    if(group.status == 409) {
        throw group.data;
    }
    if(group.status == 400) {
        throw group.data;
    }
    
    return group.data;
}


export const getGroupByName = async (groupName: string): Promise<Group> => {
    const group = await reverbClientWithAuth.get<Group>(`/api/group/${groupName}`)

    if(group.status == 404) {
        throw group.data;
    }
    return group.data;
}


