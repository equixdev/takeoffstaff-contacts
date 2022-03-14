import {useEffect, useState} from 'react'
import {addContact, logoutUser, setContacts, store, useAppDispatch, useAppSelector} from "./store";
import {Contact} from "./components/Contact";

export const Contacts = () => {
	const contacts = useAppSelector((state) => state.contacts)
	const authorizedUserLogin = useAppSelector((state) => state.authorizedUserLogin)
	const dispatch = useAppDispatch()
	const [filterBy, setFilterBy] = useState('')
	const [isAdding, setAdding] = useState(false)
	const [newTel, setNewTel] = useState('')
	const filteredContacts = contacts.map(contact => {
		return contact.tel.toString().includes(filterBy) &&
				<Contact contact={contact} key={contact.id}/>
	}).filter(Boolean)

	useEffect(() => {
		fetch("http://localhost:3001/contacts").then(res => res.json()).then(contacts => store.dispatch(setContacts(contacts)))
	}, [])

	const handleAdding = (element) => {
		element.preventDefault()
		dispatch(addContact(parseInt(newTel)))
		fetch("http://localhost:3001/addcontact", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				Data: newTel,
			},
		}).then(res => res.json()).then(res => console.log(res))
		setAdding(false)
		setNewTel(null)
	}

	return (
			<div className="max-w-2xl flex flex-col items-center">
				<header className="flex justify-between items-center w-full p-2">
					<h2 className="text-xl font-medium m-2">Контакты</h2>
					<button className="text-blue-600 m-2" onClick={() => dispatch(logoutUser())}>Выйти</button>
				</header>
				<div className="flex justify-evenly flex flex-wrap p-2">
						<input className="w-72 m-2 border border-neutral-500 rounded-lg px-4 py-2" placeholder="Поиск контактов"
									 type="search" value={filterBy} onChange={({target}) => setFilterBy(target.value)}/>
						<button className="w-72 m-2 bg-blue-600 text-white rounded-lg px-4 py-2"
										onClick={() => setAdding(true)}>Добавить
						</button>
						{filteredContacts.length > 0 ? filteredContacts : "Ничего не найдено"}
				</div>
				{isAdding &&
						<div
								className="left-0 top-0 w-full h-full fixed flex items-center justify-center z-10 bg-neutral-500 bg-opacity-50">
							<form className="shadow-2xl rounded-lg p-2 bg-white" onSubmit={handleAdding}>
								<h2 className="text-xl font-medium m-2">Добавление контакта</h2>
								<input className="w-72 m-2 border border-neutral-500 rounded-lg px-4 py-2" placeholder="Введите номер"
											 type="tel" value={newTel} pattern="[0-9]*"
											 onChange={({target}) => setNewTel(target.value)}/>
								<div className="flex items-center justify-evenly">
									<input className="w-full m-2 bg-blue-600 text-white rounded-lg px-4 py-2" type="submit"
												 onClick={handleAdding} value="Сохранить"/>
									<button className="w-full m-2 bg-red-600 text-white rounded-lg px-4 py-2"
													onClick={() => setAdding(false)}>Отменить
									</button>
								</div>
							</form>
						</div>
				}
			</div>
	);
}