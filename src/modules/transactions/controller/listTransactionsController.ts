import { Request, Response } from 'express';
import { getAllTransactions } from '../../../firebase/services/Transactions';

const listTransactionsController = async(req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    try { 
        await getAllTransactions(id).then(resp => { 
          return res.status(200).json({ transactions: resp });
        }); 
    } catch (err) {
        return res.status(404).json({message:"Error in getting all products"});
    }
}

export { listTransactionsController }