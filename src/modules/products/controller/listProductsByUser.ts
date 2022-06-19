import { Request, Response } from 'express';
import { getSpecificCategory } from '../../../firebase/services/Categories';
import { getProductsPerUser } from '../../../firebase/services/Products';

const listProductsByUser = async(req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    try { 
        await getProductsPerUser(id).then(resp => {
          resp.map(async user => {
            const category = await getSpecificCategory(user.category_id);
            Object.assign(user, {
              category_name: category.category_name,
            });
          })
          setTimeout(() => { 
             return res.status(200).json({ products: resp });
          }, 2000);
        });
    } catch (err) {
        return res.status(404).json({message:"Error in getting all products"});
    }
}

export { listProductsByUser }