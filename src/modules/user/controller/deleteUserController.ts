import {Request, Response} from 'express';
import { deleteUser } from '../../../firebase/services/Users';

const deleteUserController = async(req:Request, res:Response): Promise<Response> => {
    const id = req.params.id;
    try { 
      deleteUser(id).then(resp => {
        return res.status(200).send()
      })
    } catch (err) {
      return res.status(404).send()
    }
}

export default deleteUserController;