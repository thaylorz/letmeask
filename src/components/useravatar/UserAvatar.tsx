import avatarImg from '../../assets/images/avatar.svg';
import { useAuth } from '../../hooks/useAuth';
import './user-avatar.scss';

export default function UserAvatar() {
    const { user } = useAuth();

    return (
        <div className="user-avatar">
            <span>{user?.displayName}</span>
            <img src={user?.photoURL ? user.photoURL : avatarImg} alt={user?.displayName ? user.displayName : ''} />
        </div>
    );
}