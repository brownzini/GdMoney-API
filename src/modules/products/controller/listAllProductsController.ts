import { Request, Response } from 'express';
import { getAllProducts } from '../../../firebase/services/Products';

const listAllProductsController = async(req: Request, res: Response): Promise<Response> => {
    try { 
        await getAllProducts().then(resp => {
          console.log(resp);
          return res.status(200).json({ products: resp }).send();
        });
      } catch (err) {
          return res.status(404).json("Error in getting all products");
      }
}

export { listAllProductsController }