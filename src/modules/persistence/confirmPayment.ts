import dayjs from 'dayjs';
import { Request, Response } from 'express';
import { addTransaction } from '../../firebase/services/Transactions';

const confirmPayment = (req:Request, res:Response) => {
    const { products } = req.body;
    const currentData = dayjs().format('YYYY-MM-DD HH:mm:ss')
    let count = false;
    products.forEach(product => { 
        addTransaction({
            product_address: product.product_address,
            product_name: product.product_name,
            user_id: product.user_id,
            data: currentData,
            status:"success",
        }).catch(err => { 
            count = true;
        });
    });
    setTimeout(() => { 
        if (count === true) { 
            return res.status(400).json('Error in operation');
        }
        return res.status(200).json("Success in operation");
    },3000)
}

export default confirmPayment;