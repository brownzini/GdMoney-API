import { Request, Response } from 'express';
import { getUserProfile } from '../../../firebase/services/Users';

const listProfileUserController = async(req:Request, res:Response): Promise<Response> => {
    const id = req.params.id;
    try { 
      getUserProfile(id).then(resp => {
        return res.status(200).json({
            id: resp.id,
            username: resp.username,
            password: resp.password,
            isAdmin: resp.isAdmin,
            islogged: resp.islogged,
            wallet_address: resp.wallet_address,
            refresh_token: resp.refresh_token
        }).send();
      });
    } catch (err) {
        return res.status(404).send();
    }
}

export default listProfileUserController;