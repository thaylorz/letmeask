import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import illustrationImage from '../assets/images/illustration.svg';
import logoImage from '../assets/images/logo.svg';
import '../styles/auth.scss';

export function NewRoom() {
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
          <h2>Criar uma nova sala</h2>
          <form action="">
            <input
              type="text"
              placeholder="Nome da sala"
            />
            <Button type="submit"><span>Criar sala</span></Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}