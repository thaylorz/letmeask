import { useAuth } from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/button/Button';
import { FormEvent, useEffect, useState } from 'react';
import illustrationGift from '../../assets/images/illustration.gif';
import logoImage from '../../assets/images/logo.svg';
import googleIconImage from '../../assets/images/google-icon.svg';
import facebookIconImage from '../../assets/images/facebook-icon.svg';
import appleIconImage from '../../assets/images/apple-icon.svg';
import githubIconImage from '../../assets/images/github-icon.svg';
import './login.scss';
import '../../styles/social-midia-button-content.scss'
import { database } from '../../services/firebase';

export function Login() {
	const history = useHistory();
	const { user, loginInWithGoogle, loginInWithGithub, loginInWithEmailAndPassword } = useAuth();
	const [roomCode, setRoomCode] = useState('');
	const [authEmail, setAuthEmail] = useState('');
	const [authPassword, setAuthPassword] = useState('');

	async function handleLoginInWithEmailAndPassword(event: FormEvent) {
		event.preventDefault();

		loginInWithEmailAndPassword(authEmail, authPassword);
	}

	async function handleSignUpNewUser(event: FormEvent) {
		event.preventDefault();

		history.push('/signup');
	}

	async function handleLoginWithApple() {
		if (!user) {
			await loginInWithGoogle();
		}

		history.push('/rooms/new');
	}

	async function handleLoginWithFacebook() {
		if (!user) {
			await loginInWithGoogle();
		}

		history.push('/rooms/new');
	}

	async function handleLoginWithGithub() {
		if (!user) {
			await loginInWithGithub();
		}

		history.push('/rooms/new');
	}

	async function handleLoginWithGoogle() {
		if (!user) {
			await loginInWithGoogle();
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

	useEffect(() => {
		if (user) {
			history.push('/rooms/new');
		}
	}, [history, user]);

	return (
		<div id="page-auth">
			<aside>
				<div className="aside-content">
					<img src={illustrationGift} alt="Ilustração simbolizando perguntas e repostas" />
					<strong>Toda pergunta tem uma resposta</strong>
					<p>Aprenda e compartilhe conhecimento com outras pessoas</p>
				</div>
			</aside>

			<main>
				<div className="main-content">
					<img src={logoImage} alt="Letmeask" />
					<div className="login-wrapper">
						<form className="login-form" onSubmit={handleLoginInWithEmailAndPassword}>
							<input
								type="email"
								placeholder="Email"
								onChange={event => setAuthEmail(event.target.value)}
								value={authEmail}
								required
								autoComplete="on"
							/>
							<input
								type="password"
								placeholder="Senha"
								onChange={event => setAuthPassword(event.target.value)}
								value={authPassword}
								required
								autoComplete="current-password"
							/>
							<div className="login-button-content">
								<Button
									type="submit"
									text="Entrar"
									styleButton={
										{
											backgroundColor: "#fff",
											border: "1px solid #317ff3",
											color: "#317ff3"
										}
									}
								/>
								<Button
									type="button"
									text="Inscrever-se"
									styleButton={{ backgroundColor: "#317FF3" }}
									onClick={handleSignUpNewUser}
								/>
							</div>
						</form>
						<div className="social-midia-button-content">
							<Button
								srcIcon={appleIconImage}
								altTextIcon="Logo da Apple"
								color="black-button"
								onClick={handleLoginWithApple}
								styleButton={{ backgroundColor: "#000000" }}
							/>
							<Button
								srcIcon={facebookIconImage}
								altTextIcon="Logo do Facebook"
								color="blue-button"
								onClick={handleLoginWithFacebook}
								styleButton={{ backgroundColor: "#039BE5" }}
							/>
							<Button
								srcIcon={googleIconImage}
								altTextIcon="Logo da Google"
								color="white-button"
								onClick={handleLoginWithGoogle}
								styleButton={{ backgroundColor: "#FFFFFF" }}
							/>
							<Button
								srcIcon={githubIconImage}
								altTextIcon="Logo do Github"
								color="black-button"
								onClick={handleLoginWithGithub}
								styleButton={{ backgroundColor: "#000000" }}
							/>
						</div>
					</div>
					<div className="separator"><span>Ou entre em uma sala</span></div>
					<div>
						<form className="join-room-form" onSubmit={handleJoinRoom}>
							<input
								type="text"
								placeholder="Digite um código da sala"
								required
								onChange={event => setRoomCode(event.target.value)}
								value={roomCode}
							/>
							<Button
								type="submit"
								text="Entrar na sala"
								styleButton={{ backgroundColor: "#317FF3" }}
							/>
						</form>
					</div>
				</div>
			</main>
		</div>
	)
}