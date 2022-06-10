import { Request, Response } from 'express';
import { getSpecificCategory } from '../../../firebase/services/Categories';

const listSpecificCategoryController = async(req:Request, res:Response): Promise<Response> => {
    const id = req.params.id;
    try { 
      await getSpecificCategory(id).then(resp => {
        return res.status(200).json({
            category_name: resp.category_name,
        }).send();
      });
    } catch (err) {
        return res.status(404).json('Category not found');
    }
}

export default listSpecificCategoryController;