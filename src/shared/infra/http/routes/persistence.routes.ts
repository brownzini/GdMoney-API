import { Router } from "express";

import { ensureAuthenticated } from "../../../infra/middleware/ensureAuthenticate";
import requestPayment from "../../../../modules/persistence/requestPayment";
import confirmPayment from "../../../../modules/persistence/confirmPayment";
import verifyWallet from "../../../../modules/persistence/verifyWallet";

const persistenceRoutes = Router();

persistenceRoutes.post(
   "/request", 
   ensureAuthenticated,
   (req, res) => {
      requestPayment(req, res)
   }
);

persistenceRoutes.get(
   "/verify-wallet", 
   ensureAuthenticated,
   (req, res) => {
      verifyWallet(req, res)
   }
);

persistenceRoutes.post(
   "/confirm", 
   ensureAuthenticated, 
   (req, res) => {
      confirmPayment(req, res)
   }
);

export { persistenceRoutes }