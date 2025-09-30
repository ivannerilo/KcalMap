import ProfileHeader from "partials/profile/profileHeader/ProfileHeader";
import ProfilePicture from "partials/profile/profilePicture/ProfilePicture";
import ProfileInfo from "partials/profile/profileInfo/ProfileInfo";

export default function Profile() {
    return (
        <>
            <ProfileHeader />

            <ProfilePicture />

            <ProfileInfo />
        </>
    )
}