import { compare } from "bcryptjs";
import { Request, Response } from 'express';
import { getUserPerName } from "../../../firebase/services/Users";

import generateToken from '../../../provider/generateToken';

const authenticateUserController = async(req:Request, res:Response): Promise<Response> => {
    const { username, password } = req.body;
    try { 
      const user = await getUserPerName(username);
 
      if (user === undefined) {
          return res.status(400).json("Invalid username or password");
      }

      const passwordMatch = await compare(password, user.password);

      if (passwordMatch) {
          const token = await generateToken(user.id, 'initial');
          return res.status(200).json({
            token: token,
          });
      } else {
          return res.status(400).json("Invalid username or password");
      }
    } catch (err) {
      return res.status(404).send()
    }
}

export default authenticateUserController;