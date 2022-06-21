import { Router } from "express";

import updateUserController from "../../../../modules/user/controller/updateUserController";
import listUserController from "../../../../modules/user/controller/listUserController";
import createUserController from "../../../../modules/user/controller/createUserController";
import deleteUserController from "../../../../modules/user/controller/deleteUserController";
import listProfileUserController from "../../../../modules/user/controller/listProfileUserController";
import { ensureAuthenticated } from "../../middleware/ensureAuthenticate";
import getBnbBalanceUserController from "../../../../modules/user/controller/getBnbBalanceUserController";
import { getUserID } from "../../../../modules/user/controller/getUserID";
import changePasswordUserController from "../../../../modules/user/controller/changePasswordUserController";
import changeDataUserController from "../../../../modules/user/controller/changeDataUserController";

const usersRoutes = Router();

usersRoutes.get(
  "/", 
  ensureAuthenticated, 
  (req, res) => {
    listUserController(req, res)
  }
);

usersRoutes.post(
  "/getid", 
  (req, res) => {
    getUserID(req, res)
  }
);

usersRoutes.get(
  "/profile/:id", 
  ensureAuthenticated, 
  (req, res) => {
    listProfileUserController(req, res)
  }
);

usersRoutes.post(
  "/create", 
  (req, res) => {
    createUserController(req, res)
  }
);

usersRoutes.put(
  "/update/:id", 
  ensureAuthenticated, 
  (req, res) => {
    updateUserController(req, res)
  }
);

usersRoutes.delete(
  "/delete/:id", 
  ensureAuthenticated, 
  (req, res) => {
    deleteUserController(req, res)
  }
);

/* change Password */
usersRoutes.put(
  "/changepassword/:id", 
  ensureAuthenticated, 
  (req, res) => {
    changePasswordUserController(req, res)
  }
);

/* update username or wallet address */
usersRoutes.put(
  "/changedata/:id", 
  ensureAuthenticated, 
  (req, res) => {
    changeDataUserController(req, res)
  }
);

/***************** BLOCKCHAIN USER *******************/
usersRoutes.get(
  "/profile/getbalancebnb/:id",
  (req, res) => {
    getBnbBalanceUserController(req, res)
  }
);

export { usersRoutes };
