import { Request, Response } from 'express';
import { getUserProfile } from '../../../firebase/services/Users';
import { getProductsPerCategory } from '../../../firebase/services/Products';

const listProductsByCategory = async(req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    try { 
        await getProductsPerCategory(id).then(resp => {
          resp.map(async user => {
            const users = await getUserProfile(user.user_id);
            Object.assign(user, {
              username: users.username,
            });
          })
          setTimeout(() => { 
             return res.status(200).json({ products: resp });
          }, 2000);
        });
    } catch (err) {
        return res.status(404).json("Error in getting all products");
    }
}

export { listProductsByCategory }