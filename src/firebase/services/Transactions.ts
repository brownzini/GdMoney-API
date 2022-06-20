import {
	collection,
	addDoc,
	doc,
	deleteDoc,
	getDocs,
} from 'firebase/firestore';

import { db } from '../firebase';

const transactionColletionRef = collection(db, 'transaction_history');

type Transaction = {
	product_name:string;
	status:string;
	data: string;
}

export const getAllTransactions = async (user_id: string):Promise<Transaction[]> => {
	const data = await getDocs(transactionColletionRef);
	const products = [];
    data.docs.map(async collec => {
		if (collec.data().user_id === user_id) {
			products.push({
				product_name: collec.data().product_name,
				status: collec.data().status,
				data: collec.data().data,
			});
		}
	});
	return products;
}

export const addTransaction = async (data:Transaction) => {
	await addDoc(transactionColletionRef, data);
};

export const deleteTransaction = async (id: string) => {
	const rtDoc = doc(db, 'transaction_history', id);
	await deleteDoc(rtDoc);
};