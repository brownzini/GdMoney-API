import { Request, Response } from 'express';

import { addProduct } from '../../../firebase/services/Products';

const createProductController = async(req:Request, res:Response): Promise<Response> =>{
    const data = req.body;

    if (data.user_id === undefined) {
        Object.assign(data, {
            user_id: 'system',
            status: true
        });
    }

    try { 
      addProduct(data).then(resp => {
        return res.status(200).send();
      });
    } catch (err) {
      return res.status(404).send();
    }
}

export default createProductController;