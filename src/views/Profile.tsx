import { useUserContext } from '../hooks/ContextHooks';

const Profile = () => {
    const { user } = useUserContext();

    return (
        <div>
            {user &&
                <>
                    <h1>Profile</h1>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                </>
            }
        </div>
    );
};

export default Profile;