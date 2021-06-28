import { useAuth } from '../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { Button } from '../components/Button';
import { FormEvent, useState } from 'react';
import illustrationImage from '../assets/images/illustration.svg';
import logoImage from '../assets/images/logo.svg';
import googleIconImage from '../assets/images/google-icon.svg';
import '../styles/auth.scss';
import { database } from '../services/firebase';

export function Home() {
	const history = useHistory();
	const { user, signInWithGoogle } = useAuth();
	const [roomCode, setRoomCode] = useState('');

	async function handleCreateRoom() {
		if (!user) {
			await signInWithGoogle();
		}

		history.push('/rooms/new');
	}

	async function handleJoinRoom(event: FormEvent) {
		event.preventDefault();

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

		history.push(`/rooms/${roomCode}`);
	}

	return (
		<div id="page-auth">
			<aside>
				<img src={illustrationImage} alt="Ilustração simbolizando perguntas e repostas" />
				<strong>Crie salas de Q&amp;A ao-vivo</strong>
				<p>Tire as dúvidas da sua audiência em tempo-real</p>
			</aside>

			<main>
				<div className="main-content">
					<img src={logoImage} alt="Letmeask" />
					<button className="create-room" onClick={handleCreateRoom}>
						<img src={googleIconImage} alt="Logo do Google" />
						<span>Crie sua sala com o Google</span>
					</button>
					<div className="separator"><span>Ou entre em uma sala</span></div>
					<form onSubmit={handleJoinRoom}>
						<input
							type="text"
							placeholder="Digite um código da sala"
							onChange={event => setRoomCode(event.target.value)}
							value={roomCode}
						/>
						<Button type="submit"><span>Entrar na sala</span></Button>
					</form>
				</div>
			</main>
		</div>
	)
}