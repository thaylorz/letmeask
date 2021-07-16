import logoImg from '../../assets/images/logo.svg';
import { Button } from '../../components/button/Button';
import UserAvatar from '../../components/useravatar/UserAvatar';

export default function Dashboard() {

    function handleCreateNewRoom() {
    }

    return (
        <div className="dashboard-room">
            <head>
                <img src={logoImg} alt="Letmeask" />
                <div>
                    <Button
                        isOutlined
                        onClick={handleCreateNewRoom}
                        text="Criar sala"
                        styleButton={{ backgroundColor: "#317FF3" }}
                    />
                    <UserAvatar />
                </div>
            </head>

            <main>

            </main>
        </div>
    );
}