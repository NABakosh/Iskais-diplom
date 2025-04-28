import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './components/context/AuthContext.tsx' // не забудь путь

createRoot(document.getElementById('root')!).render(
	<Router>
		<AuthProvider>
			<App />
		</AuthProvider>
	</Router>
)
