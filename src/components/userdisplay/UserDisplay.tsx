import { useAuth } from "../../hooks/useAuth";
import avatarImage from '../../assets/images/avatar.svg';
import './user-display.scss';

export function UserDisplay() {
    const { user } = useAuth();

    return (
        <div className="user-display-content">
            <img src={user?.photoURL ? user.photoURL : avatarImage} alt="User" />
            <span>{user?.displayName}</span>
        </div>
    );
}