import { Router } from "express";

import authenticateUserController from "../../../../modules/user/controller/authenticateUserController";
import refreshToken from "../../../../modules/user/authenticate/token/refreshToken";
import logoutUser from "../../../../modules/user/authenticate/token/logoutUser";
import { ensureAuthenticated } from "../../../infra/middleware/ensureAuthenticate";

const authenticateRoutes = Router();

/***  Authenticate User *****/
authenticateRoutes.post(
   "/login", 
   (req, res) => {
      authenticateUserController(req, res)
   }
);

authenticateRoutes.post(
   "/refresh-token", 
   ensureAuthenticated, 
   (req, res) => {
      refreshToken(req, res)
   }
);

authenticateRoutes.post(
   "/logout", 
   ensureAuthenticated, 
   (req, res) => {
      logoutUser(req, res)
   }
);

export { authenticateRoutes }