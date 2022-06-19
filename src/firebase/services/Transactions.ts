import {
	collection,
	addDoc,
	doc,
	deleteDoc,
	getDoc,
} from 'firebase/firestore';

import { db } from '../firebase';

const transactionColletionRef = collection(db, 'transaction_history');

type Transaction = {
	id:string;
	product_name:string;
	user_id:string;
	status:string;
	data: string;
}

export const getAllTransactions = async (id_refresh_token: string):Promise<Transaction> => {
	const rtDoc = doc(db, 'transaction_history', id_refresh_token);
	const collec = await getDoc(rtDoc);

	const properties = collec.data();

    if (properties === undefined) {
        return null;
    }

    return {
		data: properties.data,
		id: properties.id,
		product_name: properties.product_name,
		status: properties.status,
		user_id: properties.user_id,
	};
}

export const addTransaction = async (data:Transaction) => {
	await addDoc(transactionColletionRef, data);
};

export const deleteTransaction = async (id: string) => {
	const rtDoc = doc(db, 'transaction_history', id);
	await deleteDoc(rtDoc);
};