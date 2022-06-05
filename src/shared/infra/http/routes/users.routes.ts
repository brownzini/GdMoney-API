import { Router } from "express";
import User from "firebase/models/User";

import { getUsers } from '../../../../firebase/services/User';

const usersRoutes = Router();

usersRoutes.get("/profile", (req, res) => {
    const users: User[] = []; 

    getUsers().then(resp => 
      res.status(200).json({
        users: resp
      })
    );

});

export { usersRoutes };
