import { Request, Response } from 'express';
import { getProductsPerCategory } from '../../../firebase/services/Products';

const listProductsByCategory = async(req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    try { 
        await getProductsPerCategory(id).then(resp => {
          return res.status(200).json({ products: resp });
        });
      } catch (err) {
          return res.status(404).json("Error in getting all products");
      }
}

export { listProductsByCategory }