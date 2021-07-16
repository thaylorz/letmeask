import dropDownImage from '../../assets/images/drop-down.svg';
import { useAuth } from '../../hooks/useAuth';
import './user-menu.scss';

export default function UserMenu() {
    const { user } = useAuth();

    return (
        <div>
            <span>{user?.displayName}</span>
            <img className="drop-down-icon" src={dropDownImage} alt="Drop down menu" />
        </div>
    );
}