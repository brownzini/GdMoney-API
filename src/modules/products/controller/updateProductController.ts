import {Request, Response} from 'express';
import { updateProduct } from '../../../firebase/services/Products';

const updateProductController = async(req:Request, res:Response): Promise<Response> =>{
    const id = req.params.id;
    const data = req.body;

    Object.assign(data, {
       id: id,
    });

    try {
      updateProduct(data).then(resp => {
        return res.status(200).json('Updated category');
      })
    } catch (err) {
        return res.status(404).json('Product not found');
    }
}

export default updateProductController;