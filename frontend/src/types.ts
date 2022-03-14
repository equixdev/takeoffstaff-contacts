import {store} from "./store";

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export interface Contact {
	id: number
	tel: number
}

export interface State {
	isAuthorized: boolean
	authorizedUserLogin: null | string
	contacts: Contact[]
}