import {
	collection,
	getDocs,
	addDoc,
	doc,
	updateDoc,
	getDoc,
} from 'firebase/firestore';

import { db } from '../firebase';

type Products = {
    id?: string;
    product_name: string;
    cateogry_id: string;
    img_url: string;
    price: number;
	user_id:string;
	status?:boolean;
}

const userColletionRef = collection(db, 'products');

export const getAllProducts = async ():Promise<Products[]> => {
	const data = await getDocs(userColletionRef);
	const products = [];
    data.docs.map(collec => {
		products.push({
			id: collec.id,
			product_name: collec.data().product_name,
			cateogry_id: collec.data().cateogry_id,
			img_url: collec.data().img_url,
			price: collec.data().price,
			user_id: collec.data().user_id,
			status: collec.data().status,
		})
	});
	return products;
};

export const getSpecificProduct = async (id: string): Promise<Products> => {
	const userDoc = doc(db, 'products', id);
	const collec = await getDoc(userDoc)

	const data = {
        product_name: collec.data().product_name,
        cateogry_id: collec.data().cateogry_id,
        img_url: collec.data().img_url,
        price: collec.data().price,
		user_id: collec.data().user_id,
		status: collec.data().status,
	};

	return data;
};

export const addProduct = async (data: Products) => {
    await addDoc(userColletionRef, data);
};

export const updateProduct = async (data: Products) => {
	const productDoc = doc(db, 'products', data.id);
	delete data.id;
	await updateDoc(productDoc, data);
};