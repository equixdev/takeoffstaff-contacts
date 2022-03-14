import {deleteContact, editContact, useAppDispatch} from "../store";
import {Contact as IContact} from "../types";
import {FC, useState} from "react";

interface Props {
	contact: IContact
}

export const Contact: FC<Props> = ({contact}) => {
	const [isEditing, setEditing] = useState(false)
	const [newTel, setNewTel] = useState(contact.tel.toString())
	const dispatch = useAppDispatch()

	const handleEdit = (element) => {
		element.preventDefault()
		fetch(`http://localhost:3001/contacts/${contact.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(contact)
		})
		dispatch(editContact({id: contact.id, newTel: parseInt(newTel)}))
		setEditing(false)
		setNewTel(newTel)
	}

	const handleDelete = () => {
		fetch(`http://localhost:3001/contacts/${contact.id}`, {
			method: 'DELETE',
		})
		dispatch(deleteContact(contact.id))
	}

	return (
			<div className="w-72 rounded-lg bg-white shadow-2xl p-2 m-2">
				{!isEditing ? <>
							<p className="font-medium m-2">+{contact.tel}</p>
							<div className="flex items-center justify-evenly">
								<button className="w-full m-2 bg-blue-600 text-white rounded-lg px-4 py-2"
												onClick={() => setEditing(true)}>Изменить
								</button>
								<button className="w-full m-2 bg-red-600 text-white rounded-lg px-4 py-2"
												onClick={handleDelete}>Удалить
								</button>
							</div>
						</> :
						<form onSubmit={handleEdit}>
							<input className="w-72 m-2 border border-neutral-500 rounded-lg px-4 py-2"
										 placeholder="Введите новый номер" type="tel" pattern="[0-9]*" value={newTel}
										 onChange={({target}) => setNewTel(target.value)}/>
							<div className="flex items-center">
								<input className="w-full m-2 bg-blue-600 text-white rounded-lg px-4 py-2" type="submit"
											 value="Сохранить"/>
								<button className="w-full m-2 bg-red-600 text-white rounded-lg px-4 py-2" onClick={() => setEditing(false)}>Отменить</button>
							</div>
						</form>
				}
			</div>)
}