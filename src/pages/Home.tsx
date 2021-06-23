import { useAuth } from '../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { Button } from '../components/Button';
import illustrationImage from '../assets/images/illustration.svg';
import logoImage from '../assets/images/logo.svg';
import googleIconImage from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

export function Home() {
	const history = useHistory();
	const { user, signInWithGoogle } = useAuth();

	async function handleCreateRoom() {
		if (!user) {
			await signInWithGoogle();
		}

		history.push('/rooms/new');
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
					<form action="">
						<input
							type="text"
							placeholder="Digite um código da sala"
						/>
						<Button type="submit"><span>Entrar na sala</span></Button>
					</form>
				</div>
			</main>
		</div>
	)
}