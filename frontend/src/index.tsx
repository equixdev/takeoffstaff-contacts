import {render} from 'react-dom'
import {Contacts} from "./Contacts"
import {Login} from "./Login"
import {Provider} from "react-redux"
import {store, useAppSelector} from './store'
import {Register} from "./Register"
import './index.css'

const App = () => {
	const isAuthorized = useAppSelector((state) => state.isAuthorized)
	return (
			<div className="h-screen flex flex-col items-center">
				<h1 className="text-2xl text-center font-medium mt-4">Takeout-staff</h1>
				{isAuthorized ? <Contacts/> :
						<div className="flex justify-center items-center flex-wrap">
							<Login/>
							<Register/>
						</div>
				}
			</div>)
}

render(
		<Provider store={store}>
			<App/>
		</Provider>,
		document.getElementById('root')
)