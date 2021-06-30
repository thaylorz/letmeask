import { FormEvent, useState } from 'react';
import { Button } from '../../components/button/Button';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logoImage from '../../assets/images/logo.svg';
import illustrationGift from '../../assets/images/illustration.gif';
import './sign-up.scss';

export function SignUp() {
    const history = useHistory();
    const { user, createNewUser } = useAuth();
    const [authEmail, setAuthEmail] = useState('');
    const [authPassword, setAuthPassword] = useState('');

    async function handleCreateNewUser(event: FormEvent) {
        event.preventDefault();

        if (!user) {
            await createNewUser(authEmail, authPassword);
        }

        history.push('/rooms/new');
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
                    <form className="sign-up-form" onSubmit={handleCreateNewUser}>
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