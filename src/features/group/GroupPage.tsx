import { useState } from "react";
import { useParams } from "react-router-dom";
import Feed from "../feed/Feed";
import GroupInformation from "./GroupInformation";


export default function GroupPage() {

    const { groupName } = useParams();

    return <>
    <GroupInformation name={groupName}/>
    <Feed groupName = {groupName} isGroup={true} />
    </>
}