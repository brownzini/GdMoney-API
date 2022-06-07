import {Request, Response} from 'express';
import { updateUser } from '../../../firebase/services/Users';

const updateUserController = async(req:Request, res:Response): Promise<Response> =>{
    const id = req.params.id;
    const data = req.body;

    Object.assign(data, {
       id: id,
    });

    try { 
      updateUser(data).then(resp => {
        return res.status(200).send()
      })
    } catch (err) {
        return res.status(404).send()
    }
}

export default updateUserController;