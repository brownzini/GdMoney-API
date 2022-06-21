import { hash, compare } from "bcryptjs";
import { Request, Response } from 'express';
import { getUserProfile, updateUser } from "../../../firebase/services/Users";

const changePasswordUserController = async(req:Request, res:Response): Promise<Response> => {
    const id = req.params.id;
    const { 
        password,
        newPassword,
    } = req.body;
    try { 
      const user = await getUserProfile(id);
 
      if (user === undefined) {
          return res.status(400).json("Invalid username or password");
      }

      const passwordMatch = await compare(password, user.password);

      if (passwordMatch) {
          const password_encrypted = await hash(newPassword, 8);
          Object.assign(user, { password: password_encrypted });
          try {
            await updateUser(user);
            return res.status(200).json({message:'Success'});
          } catch(error) {
            return res.status(400).json({message:'Error'});
          }
      } else {
          return res.status(400).json({message:"Invalid username or password"});
      }
    } catch (err) {
      return res.status(404).send()
    }
}

export default changePasswordUserController;