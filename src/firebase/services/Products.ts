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
    id: string;
    cateogry_id: string;
    img_url: string;
    price: number;
    product_address: string;
    product_name: string;
	user_id:string;
}

const userColletionRef = collection(db, 'products');

export const getAllProducts = async ():Promise<Products[]> => {
	const data = await getDocs(userColletionRef);
	const products = [];
    data.docs.map(collec => {
		products.push({
			id: collec.id,
			product_address: collec.data().product_address,
			product_name: collec.data().product_name,
			cateogry_id: collec.data().cateogry_id,
			img_url: collec.data().img_url,
			price: collec.data().price,
			user_id: collec.data().user_id,
		})
	});
	return products;
};

export const getProductSpecifc = async (id: string): Promise<Products> => {
	const userDoc = doc(db, 'products', id);
	const collec = await getDoc(userDoc)

	const data = {
        id: collec.id,
        product_address: collec.data().product_address,
        product_name: collec.data().product_name,
        cateogry_id: collec.data().cateogry_id,
        img_url: collec.data().img_url,
        price: collec.data().price,
		user_id: collec.data().user_id,
	};

	return data;
};

export const addProduct = async (data: Products) => {
    await addDoc(userColletionRef,  data);
};

export const updateProduct = async (data: Products) => {
	const userDoc = doc(db, 'products', data.id);
	await updateDoc(userDoc, data);
};