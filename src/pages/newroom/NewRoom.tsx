import { Link, useHistory } from 'react-router-dom';
import { FormEvent } from 'react';
import { Button } from '../../components/button/Button';
import { useState } from 'react';
import { database } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';
import illustrationGift from '../../assets/images/illustration.gif';
import logoImage from '../../assets/images/logo.svg';
import './new-room.scss';

export function NewRoom() {
	const { user } = useAuth();
	const [newRoom, setNewRoom] = useState('');
	const history = useHistory();

	async function handleCreateNewRoom(event: FormEvent) {
		event.preventDefault();

		if (newRoom.trim() === '') {
			return;
		}

		const roomRef = database.ref('rooms');

		const firebaseRoom = await roomRef.push({
			title: newRoom,
			authorId: user?.uid
		});

		history.push(`/rooms/${firebaseRoom.key}`);
	}

	return (
		<div id="page-auth">
			<aside>
				<img src={illustrationGift} alt="Ilustração simbolizando perguntas e repostas" />
				<strong>Crie salas de Q&amp;A ao-vivo</strong>
				<p>Tire as dúvidas da sua audiência em tempo-real</p>
			</aside>

			<main>
				<div className="main-content">
					<img src={logoImage} alt="Letmeask" />
					<h2>Criar uma nova sala</h2>
					<form onSubmit={handleCreateNewRoom}>
						<input
							type="text"
							placeholder="Nome da sala"
							onChange={event => setNewRoom(event.target.value)}
							value={newRoom}
						/>
						<Button type="submit"><span>Criar sala</span></Button>
					</form>
					<p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
				</div>
			</main>
		</div>
	)
}