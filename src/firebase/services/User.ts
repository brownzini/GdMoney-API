import {
	collection,
	getDocs,
	addDoc,
	doc,
	deleteDoc,
	updateDoc,
} from 'firebase/firestore';

import { db } from '../firebase';
import User from '../models/User';

const userColletionRef = collection(db, 'users');

export const getUsers = async () => {
	const data = await getDocs(userColletionRef);

	return data.docs.map(collec => {
		const properties = collec.data();
		return new User(properties.name, properties.age, collec.id);
	});
};

export const addUser = async (name: string, age: number) => {
	const user = await addDoc(userColletionRef, { name, age });
	console.log(user);
};

export const deleteUser = async (id: string) => {
	const userDoc = doc(db, 'users', id);
	await deleteDoc(userDoc);
};

export const updateUser = async (name: string, age: number, id: string) => {
	const userDoc = doc(db, 'users', id);
	await updateDoc(userDoc, {
		name,
		age,
	});
};