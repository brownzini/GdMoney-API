//Components
import dayjs from 'dayjs';
import { Request, Response } from 'express';

//DB
import { addProduct } from '../../../firebase/services/Products';

const createProductController = async(req:Request, res:Response): Promise<Response> =>{
    const data = req.body;

    if (data.user_id === undefined) {
        Object.assign(data, {
            user_id: 'system',
            data: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            status: true
        });
    }

    try { 
      addProduct(data).then(resp => {
        return res.status(200).json('Created');
      });
    } catch (err) {
      return res.status(404).json('Error in creating product');
    }
}

export default createProductController;