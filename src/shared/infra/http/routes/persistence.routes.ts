import { Router } from "express";

import { ensureAuthenticated } from "../../../infra/middleware/ensureAuthenticate";
import requestPayment from "../../../../modules/persistence/requestPayment";
import confirmPayment from "../../../../modules/persistence/confirmPayment";

const persistenceRoutes = Router();

persistenceRoutes.post(
   "/request", 
   ensureAuthenticated,
   (req, res) => {
      requestPayment(req, res)
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