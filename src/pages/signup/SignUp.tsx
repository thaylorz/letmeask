import { FormEvent, useState } from 'react';
import { Button } from '../../components/button/Button';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logoImage from '../../assets/images/logo.svg';
import illustrationGift from '../../assets/images/illustration.gif';
import googleIconImage from '../../assets/images/google-icon.svg';
import facebookIconImage from '../../assets/images/facebook-icon.svg';
import appleIconImage from '../../assets/images/apple-icon.svg';
import githubIconImage from '../../assets/images/github-icon.svg';
import './sign-up.scss';
import '../../styles/social-midia-button-content.scss'

export function SignUp() {
    const history = useHistory();
    const { user, createNewUser, loginInWithGoogle, loginInWithGithub } = useAuth();

    const [authEmail, setAuthEmail] = useState('');
    const [authPassword, setAuthPassword] = useState('');
    const [authName, setAuthName] = useState('');

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

    async function handleCreateNewUser(event: FormEvent) {
        event.preventDefault();

        debugger;

        if (!user) {
            await createNewUser(authName, authEmail, authPassword);
        }
    }

    return (
        <div id="page-sign-up">
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
                    <div className="separator"><span>Ou cadastre-se</span></div>
                    <form className="sign-up-form" onSubmit={handleCreateNewUser}>
                        <input
                            type="text"
                            placeholder="Nome"
                            onChange={event => setAuthName(event.target.value)}
                            value={authName}
                            required
                            autoComplete="on"
                        />
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
                            placeholder="Password"
                            onChange={event => setAuthPassword(event.target.value)}
                            value={authPassword}
                            required
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            text="Criar conta"
                            styleButton={{ backgroundColor: "#317FF3" }}
                        />
                    </form>
                    <p>já tem uma conta? <Link to="/">Entrar →</Link></p>
                </div>
            </main>
        </div>
    )
}