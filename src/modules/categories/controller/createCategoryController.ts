import { Request, Response } from 'express';

import { addCategory } from '../../../firebase/services/Categories';

const createCategoryController = async(req:Request, res:Response): Promise<Response> =>{
    const data = req.body;
    try { 
      addCategory(data).then(resp => {
        return res.status(200).json('Sucessfully');
      });
    } catch (err) {
      return res.status(404).json('Error in the create category');
    }
}

export default createCategoryController;