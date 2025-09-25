import ProfileHeader from "partials/profile/profileHeader/ProfileHeader";
import ProfilePicture from "partials/profile/profilePicture/ProfilePicture";
import { useEffect } from "react";
import { useUser } from "contexts/UserContext";

export default function Profile() {
    const { getProfile } = useUser();

    useEffect(() => {
        getProfile();
    }, [])

    return (
        <>
            <ProfileHeader />

            <ProfilePicture />

            {/* <ProfileForm /> */}
        </>
    )
}