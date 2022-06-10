import {Request, Response} from 'express';
import { deleteCategory } from '../../../firebase/services/Categories';

const deleteCategoryController = async(req:Request, res:Response): Promise<Response> => {
    const id = req.params.id;
    try { 
        deleteCategory(id).then(resp => {
        return res.status(200).json('Category deleted');
      })
    } catch (err) {
      return res.status(404).json('Error deleting')
    }
}

export default deleteCategoryController;