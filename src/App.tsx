import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login } from './pages/login/Login';
import { NewRoom } from './pages/newroom/NewRoom';
import { AuthContextProvider } from './contexts/AuthContext';
import { ModalContextProvider } from './contexts/ModalContext'
import { Room } from './pages/room/Room';
import { AdminRoom } from './pages/adminroom/AdminRoom';
import { SignUp } from './pages/signup/SignUp';
import { Modal } from './components/modal/Modal';
import { Dashboard } from './pages/dashboard/Dashboard';

function App() {
	return (
		<BrowserRouter>
			<ModalContextProvider>
				<AuthContextProvider>
					<Switch>
						<Route path="/" exact component={Login}></Route>
						<Route path="/signup" exact component={SignUp}></Route>
						<Route path="/dashboard" exact component={Dashboard}></Route>
						<Route path="/rooms/new" exact component={NewRoom} />
						<Route path="/rooms/:id" component={Room} />
						<Route path="/admin/room/:id" component={AdminRoom} />
					</Switch>
					<Modal />
				</AuthContextProvider>
			</ModalContextProvider>
		</BrowserRouter>
	);
}

export default App;
