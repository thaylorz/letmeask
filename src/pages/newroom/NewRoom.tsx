import { Link } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { Button } from '../../components/button/Button';
import illustrationGift from '../../assets/images/illustration.gif';
import logoImage from '../../assets/images/logo.svg';
import './new-room.scss';
import { useCreateRoom } from '../../hooks/useCreateRoom';

export function NewRoom() {
	const [roomName, setRoomName] = useState('');
	const { setNewRoom } = useCreateRoom();

	async function handleCreateNewRoom(event: FormEvent) {
		event.preventDefault();

		if (roomName.trim() === '') {
			return;
		}

		setNewRoom(roomName);
	}

	return (
		<div className="page-new-room">
			<aside>
				<div className="aside-content">
					<img src={illustrationGift} alt="Ilustração simbolizando perguntas e repostas" />
					<strong>Crie salas de Q&amp;A ao-vivo</strong>
					<p>Tire as dúvidas da sua audiência em tempo-real</p>
				</div>
			</aside>

			<main>
				<div className="main-content">
					<img src={logoImage} alt="Letmeask" />
					<h2>Criar uma nova sala</h2>
					<form onSubmit={handleCreateNewRoom}>
						<input
							type="text"
							placeholder="Nome da sala"
							onChange={event => setRoomName(event.target.value)}
							value={roomName}
						/>
						<Button
							type="submit"
							text="Criar sala"
							styleButton={{ backgroundColor: "#317FF3" }}
						/>
					</form>
					<p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
				</div>
			</main>
		</div>
	)
}