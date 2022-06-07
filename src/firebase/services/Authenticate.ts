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

const refreshTokenColletionRef = collection(db, 'refresh_token');

export const getRefreshToken = async (id_refresh_token: string) => {
	const rtDoc = doc(db, 'refresh_token', id_refresh_token);
	const collec = await getDoc(rtDoc);

	const properties = collec.data();

    if (properties === undefined) {
        return null;
    }

    return {
		id: collec.id,
		user_id: properties.user_id,
		expiresIn: properties.expiresIn,
	};
}

export const getUserUserID = async (username: string) => {
	const data = await getDocs(refreshTokenColletionRef);
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

export const addRefreshToken = async (user_id: string, expiresIn: number):Promise<string> => {
	const rtDoc = await addDoc(refreshTokenColletionRef, { user_id, expiresIn });
	const  collec = await getDoc(rtDoc);
	return collec.id;
};

export const updateRefreshToken = async (expiresIn: number, id_refresh_token: string) => {
	const rtDoc = doc(db, 'refresh_token', id_refresh_token);
	await updateDoc(rtDoc, {
		expiresIn,
	});
};

export const deleteRT = async (id: string) => {
	const rtDoc = doc(db, 'refresh_token', id);
	await deleteDoc(rtDoc);
};