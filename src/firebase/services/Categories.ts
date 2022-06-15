import {
	collection,
	getDocs,
	addDoc,
	doc,
	updateDoc,
	getDoc,
    deleteDoc,
} from 'firebase/firestore';

import { db } from '../firebase';

type Categories = {
    id?: string;
    category_name:string;
}

const userColletionRef = collection(db, 'categories');

export const getAllCategories = async ():Promise<Categories[]> => {
	const data = await getDocs(userColletionRef);
	const categories = [];
    data.docs.map(collec => {
		categories.push({
			id: collec.id,
			category_name: collec.data().category_name,
		})
	});
	return categories;
};

export const getSpecificCategory = async (id: string): Promise<Categories> => {
	const userDoc = doc(db, 'categories', id);
	const collec = await getDoc(userDoc)

	const data = {
        category_name: collec.data().category_name,
	};

	return data;
};

export const addCategory = async (data: Categories) => {
    await addDoc(userColletionRef, data);
};

export const updateCategory = async (data: Categories) => {
	const categoryDoc = doc(db, 'categories', data.id);
    delete data.id;
	await updateDoc(categoryDoc, data);
};

export const deleteCategory = async (id: string) => {
	const categoryDoc = doc(db, 'categories', id);
	await deleteDoc(categoryDoc);
};