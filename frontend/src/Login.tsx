import {useState} from "react";
import {loginUser, store} from "./store";

export const Login = () => {
	const [login, setLogin] = useState('')
	const [passwd, setPasswd] = useState('')
	const [areCredentialsIncorrect, setCredentialsIncorrect] = useState(false)

	const handleLogin = (element) => {
		element.preventDefault()
		fetch("http://localhost:3001/login", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				Authorization: `${login} ${passwd}`
			},
		}).then(res => res.json()).then(areCredentialsCorrect => {
			areCredentialsCorrect ? store.dispatch(loginUser(login)) : setCredentialsIncorrect(true)
		})
	}

	return (
			<div className="max-w-xs p-2">
				<h2 className="text-xl font-medium m-2">Вход</h2>
				<form onSubmit={handleLogin}>
					{areCredentialsIncorrect && <p className="m-2 text-red-600">Неверный логин или пароль</p>}
					<input className="w-72 m-2 border border-neutral-500 rounded-lg px-4 py-2" type="text" placeholder="Введите логин" value={login}
								 onChange={({target}) => setLogin(target.value)}/>
					<input className="w-72 m-2 border border-neutral-500 rounded-lg px-4 py-2" type="password" placeholder="Введите пароль" value={passwd}
								 onChange={({target}) => setPasswd(target.value)}/>
					<input className="w-72 m-2 bg-blue-600 text-white rounded-lg px-4 py-2" type="submit" value="Войти"/>
				</form>
			</div>
	);
}