import { reverbClientWithAuth } from "../../remote/reverb-api/reverbClient";
import { NewGroupRequest } from "./dtos/NewGroupRequest";
import UpdateGroupRequest from "./dtos/UpdateGroupRequest";
import { Group } from "./Group";

export const createGroup = async (newGroup: NewGroupRequest): Promise<Group> => {
    const group = await reverbClientWithAuth.post<Group>('/api/group/create', newGroup);
    
    if(group.status == 409) {
        throw group.data;
    }
    if(group.status == 400) {
        throw group.data;
    }
    return group.data;
}


export const getGroupByName = async (groupName: string): Promise<Group> => {
    console.log("Fetching group info");
    const group = await reverbClientWithAuth.get<Group>(`/api/group/${groupName}`)

    if(group.status == 404) {
        throw group.data;
    }

    if(group.status == 200) {
        console.log("have group info");
        return group.data;
    }
    return group.data;
}

export const editGroup = async (updatedGroup: UpdateGroupRequest, oldGroupName: string): Promise<Group> => {
    const group = await reverbClientWithAuth.patch<Group>(`/api/group/update/${oldGroupName}`, updatedGroup);

    if(group.status == 403){
        throw group.data;
    }
    
    if(group.status == 404){
        throw group.data;
    }

    if(group.status == 409){
        throw group.data;
    }

    return group.data;

}


