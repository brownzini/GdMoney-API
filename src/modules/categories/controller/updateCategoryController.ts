import {Request, Response} from 'express';
import { updateCategory } from '../../../firebase/services/Categories';

const updateCategoryController = async(req:Request, res:Response): Promise<Response> =>{
    const id = req.params.id;
    const data = req.body;

    Object.assign(data, {
       id: id,
    });

    try {
      updateCategory(data).then(resp => {
        return res.status(200).json('Updated category');
      })
    } catch (err) {
        return res.status(404).json('Category not found');
    }
}

export default updateCategoryController;