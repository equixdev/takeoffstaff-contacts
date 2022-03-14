import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Contact, State} from "../types";

const initialState : State = {
	isAuthorized: false,
	authorizedUserLogin: null,
	contacts: [] as Contact[]
}

export const reducerSlice = createSlice({
			name: "reducerSlice",
			initialState,
			reducers: {
				addContact: (state, action: PayloadAction<number>) => {
							state.contacts.push({
										id: state.contacts.length,
										tel: action.payload
									}
							)
				},
				setContacts: (state, action: PayloadAction<Contact[]>) => {
					state.contacts = action.payload
				},
				deleteContact: (state, action: PayloadAction<number>) => {
					return {...state, contacts: state.contacts.filter(contact => contact.id !== action.payload)}
				},
				editContact: (state, action: PayloadAction<{ id: number; newTel: number }>) => {
					const {id, newTel} = action.payload
					const indexOfContact = state.contacts.findIndex((contact: Contact) => contact.id === id);
					if (indexOfContact === -1) return state;

					return {
						...state, contacts: [
							...state.contacts.slice(0, indexOfContact),
							{...state.contacts[indexOfContact], tel: newTel},
							...state.contacts.slice(indexOfContact + 1),
						]
					}
				},
				loginUser: (state, action: PayloadAction<string>) => {
					state.isAuthorized = true
					state.authorizedUserLogin = action.payload
				},
				logoutUser: (state) => {
					state.isAuthorized = false
					state.authorizedUserLogin = null
				}
			}
		}
)