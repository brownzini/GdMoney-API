import { Request, Response } from 'express';
import { getSpecificProduct } from '../../../firebase/services/Products';

const listSpecificProductController = async(req:Request, res:Response): Promise<Response> => {
    const id = req.params.id;
    try { 
      await getSpecificProduct(id).then(resp => {
        return res.status(200).json({
            product_name: resp.product_name,
            cateogry_id: resp.cateogry_id,
            img_url: resp.img_url,
            price: resp.price,
            user_id: resp.user_id,
            status: resp.status
        }).send();
      });
    } catch (err) {
        return res.status(404).json('Product not found');
    }
}

export default listSpecificProductController;