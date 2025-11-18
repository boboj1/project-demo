import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { worker } from '@/msw'
import { ThemeContext } from '@/context'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<ThemeContext.Provider value={'light'}>
			<App />
		</ThemeContext.Provider>
	</Provider>
)
