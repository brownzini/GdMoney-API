import { Request, Response } from 'express';
import { getUserProfile, updateUser } from "../../../firebase/services/Users";

const changeDataUserController = async(req:Request, res:Response): Promise<Response> => {
    const id = req.params.id;
    const { 
        username,
        wallet_address,
    } = req.body;
    try { 
      const user = await getUserProfile(id);
 
      if (user === undefined) {
          return res.status(400).json("Invalid username or password");
      }
      Object.assign(user, { 
        username: username,
        wallet_address: wallet_address,
      });
      try {
        await updateUser(user);
        return res.status(200).json({message:'Success'});
      } catch(error) {
        return res.status(400).json({message:'Error'});
      }
    } catch (err) {
      return res.status(404).send()
    }
}

export default changeDataUserController;