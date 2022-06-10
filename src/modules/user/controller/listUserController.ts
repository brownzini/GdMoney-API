import {Request, Response} from 'express';
import { getUsers } from '../../../firebase/services/Users';

const listUserController = async(req:Request, res:Response): Promise<Response> => {
    try { 
      await getUsers().then(resp => {
        return res.status(200).json({ users: resp }).send()
      });
    } catch (err) {
        return res.status(404).send()
    }
}

export default listUserController;