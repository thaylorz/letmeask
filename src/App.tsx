import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login } from './pages/login/Login';
import { NewRoom } from './pages/newroom/NewRoom';
import { AuthContextProvider } from './contexts/AuthContext';
import { Room } from './pages/room/Room';
import { AdminRoom } from './pages/adminroom/AdminRoom';
import { SignUp } from './pages/signup/SignUp';

function App() {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Switch>
					<Route path="/" exact component={Login}></Route>
					<Route path="/signup" exact component={SignUp}></Route>
					<Route path="/rooms/new" exact component={NewRoom} />
					<Route path="/rooms/:id" component={Room} />
					<Route path="/admin/rooms/:id" component={AdminRoom} />
				</Switch>
			</AuthContextProvider>
		</BrowserRouter>
	);
}

export default App;
