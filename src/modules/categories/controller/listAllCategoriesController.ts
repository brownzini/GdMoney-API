import { Request, Response } from 'express';
import { getAllCategories } from '../../../firebase/services/Categories';

const listAllCategoriesController = async(req: Request, res: Response): Promise<Response> => {
    try { 
        await getAllCategories().then(resp => {
          return res.status(200).json({ categories: resp }).send();
        });
      } catch (err) {
          return res.status(404).json("Error in getting all categories");
      }
}

export { listAllCategoriesController }