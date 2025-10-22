import ProfileHeader from "partials/profile/profileHeader/ProfileHeader";
import ProfilePicture from "partials/profile/profilePicture/ProfilePicture";
import ProfileInfo from "partials/profile/profileInfo/ProfileInfo";
import { useState, useEffect } from "react";
import { useUser } from "contexts/UserContext";

export default function Profile() {
    const [profile, setProfile] = useState();
    const { getProfile } = useUser();

    
    
    useEffect(() => {
        async function load() {
            const response = await getProfile();
            console.log(response)
            setProfile(response)
        }
        load();
    }, [])

    return (
        <>
            <ProfileHeader profile={profile}/>

            <ProfilePicture profile={profile}/>

            <ProfileInfo  profile ={profile}/>
        </>
    )
}