import { Request, Response } from 'express';

import { hash } from "bcryptjs";
import { addUser } from '../../../firebase/services/Users';

const createUserController = async(req:Request, res:Response): Promise<Response> =>{
    const data = req.body;
    const password_encrypted = await hash(data.password, 8);

    Object.assign(data, {
      password: password_encrypted,
      islogged: false,
      isAdmin: false,
      wallet_address: data.wallet_address,
      refresh_token: "",
    });

    try { 
      addUser(data).then(resp => {
        return res.status(200).json({description: 'Created'});
      })
    } catch (err) {
      return res.status(400).json({description: 'User already exists'});
    }
}

export default createUserController;