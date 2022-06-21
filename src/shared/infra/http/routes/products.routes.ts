import { Router } from "express";
import listSpecificProductController from "../../../../modules/products/controller/listSpecificProductController";
import { listAllProductsController } from "../../../../modules/products/controller/listAllProductsController";
import createProductController from "../../../../modules/products/controller/createProductController";
import updateProductController from "../../../../modules/products/controller/updateProductController";
import { listProductsByCategory } from "../../../../modules/products/controller/listProductsByCategory";
import { listProductsByUser } from "../../../../modules/products/controller/listProductsByUser";

import { ensureAuthenticated } from "../../middleware/ensureAuthenticate";
import { ensureAdmin } from "../../../infra/middleware/ensureAdmin";

const productsRoutes = Router();

productsRoutes.get(
  "/", 
 // ensureAuthenticated,
  (req, res) => {
    listAllProductsController(req, res)
  }
);

productsRoutes.get(
  "/:id", 
  ensureAuthenticated,
  (req, res) => {
    listSpecificProductController(req, res)
  }
);

productsRoutes.get(
  "/bycategory/:id",
  ensureAuthenticated,
  (req, res) => {
    listProductsByCategory(req, res)
  }
);

productsRoutes.get(
  "/byuser/:id",
  ensureAuthenticated,
  (req, res) => {
    listProductsByUser(req, res)
  }
);

productsRoutes.post(
  "/add", 
  ensureAuthenticated,
  ensureAdmin,
  (req, res) => {
    createProductController(req, res)
  }
);

productsRoutes.put(
  "/update/:id", 
  ensureAuthenticated,
  (req, res) => {
    updateProductController(req, res)
  }
);

export { productsRoutes };
