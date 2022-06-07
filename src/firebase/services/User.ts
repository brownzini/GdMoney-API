import {
	collection,
	getDocs,
	addDoc,
	doc,
	deleteDoc,
	updateDoc,
	getDoc,
} from 'firebase/firestore';

import { db } from '../firebase';

const userColletionRef = collection(db, 'users');

type RequestCreate = {
	id: string;
	username: string;
	password: string;
	isAdmin?: boolean;
	islogged?: boolean;
	wallet_address: string;
	refresh_token?: string;
}

type RequestUpdate = {
	id: string;
	username?: string;
	password?: string;
	isAdmin?: boolean;
	islogged?: boolean;
	wallet_address?: string;
	refresh_token?: string;
}

export const getUserPerName = async (username: string) => {
	const data = await getDocs(userColletionRef);
	const users = [];
    data.docs.map(collec => {
		if (collec.data().username === username) {
		  users.push({
			id: collec.id,
			username: collec.data().username,
			password: collec.data().password,
			isAdmin: collec.data().isAdmin,
			islogged: collec.data().islogged,
			wallet_address: collec.data().wallet_address,
			refresh_token: collec.data().refresh_token,
		  })
		}
	});
	return users[0];
};

export const getUsers = async () => {
	const data = await getDocs(userColletionRef);
	const users = [];
    data.docs.map(collec => {
		users.push({
			id: collec.id,
			username: collec.data().username,
			password: collec.data().password,
			isAdmin: collec.data().isAdmin,
			islogged: collec.data().islogged,
			wallet_address: collec.data().wallet_address,
			refresh_token: collec.data().refresh_token,
		})
	});
	return users;
};

export const getUserProfile = async (id: string): Promise<RequestUpdate> => {
	const userDoc = doc(db, 'users', id);
	const collec = await getDoc(userDoc)

	const data = {
		id: collec.id,
		username: collec.data().username,
		password: collec.data().password,
		isAdmin: collec.data().isAdmin,
		islogged: collec.data().islogged,
		wallet_address: collec.data().wallet_address,
		refresh_token: collec.data().refresh_token,
	};

	return data;
};

export const addUser = async (data: RequestCreate) => {
    await addDoc(userColletionRef,  data);
};

export const updateUser = async (data: RequestUpdate) => {
	const userDoc = doc(db, 'users', data.id);
	await updateDoc(userDoc, data);
};

export const deleteUser = async (id: string) => {
	const userDoc = doc(db, 'users', id);
	await deleteDoc(userDoc);
};