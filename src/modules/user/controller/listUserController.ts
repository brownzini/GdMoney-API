import {Request, Response} from 'express';
import { getUsers } from '../../../firebase/services/Users';

const listUserController = async(req:Request, res:Response): Promise<Response> => {
    try { 
      getUsers().then(resp => {
        return res.status(200).json({ user: resp }).send()
      });
    } catch (err) {
        return res.status(404).send()
    }
}

export default listUserController;