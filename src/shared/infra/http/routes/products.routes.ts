import { Router } from "express";
import { listAllProductsController } from "../../../../modules/products/controller/listAllProductsController";

import { ensureAuthenticated } from "../../middleware/ensureAuthenticate";

const productsRoutes = Router();

productsRoutes.get(
  "/", 
  (req, res) => {
    listAllProductsController(req, res)
  }
);

export { productsRoutes };
