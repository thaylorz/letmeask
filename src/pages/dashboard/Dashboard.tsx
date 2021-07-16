import { useHistory } from 'react-router-dom';
import logoImg from '../../assets/images/logo.svg';
import { Button } from '../../components/button/Button';
import { Header } from '../../components/header/Header';
import dropDownImage from '../../assets/images/drop-down.svg';
import { useAuth } from '../../hooks/useAuth';
import './dashboard.scss';
import { useRooms } from '../../hooks/useRooms';
import { List } from '../../components/list/List';
import { MainContainer } from '../../components/maincontainer/MainContainer';
import { database } from '../../services/firebase';
import UserMenu from '../../components/usermenu/UserMenu';

export function Dashboard() {
    const { user } = useAuth();
    const { rooms } = useRooms();
    const history = useHistory();

    function handleCreateNewRoom() {
        history.push('/rooms/new');
    }

    async function handleJoinRoom(roomCode: string) {
        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Rooms does not exist');
            return;
        }

        if (roomRef.val().closedAt) {
            alert('Rooms already closed');
            return;
        }

        history.push(`/admin/room/${roomCode}`);
    }

    return (
        <div className="dashboard-page">
            <Header>
                <img src={logoImg} alt="Letmeask" />
                <div>
                    <Button
                        isOutlined
                        onClick={handleCreateNewRoom}
                        text="Criar sala"
                        styleButton={{ backgroundColor: "#317FF3", color: "#fff" }}
                    />
                    <UserMenu />
                </div>
            </Header>

            <MainContainer>
                <List style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: '16px',
                    justifyContent: 'space-around',
                    alignItems: 'baseline'
                }}>
                    {rooms.map(room => {
                        return (
                            <li key={room.id} className="room-list" onClick={() => handleJoinRoom(room.id)}>
                                <h1>{room.title}</h1>
                            </li>
                        );
                    })}
                </List>
            </MainContainer>
        </div >
    );
}