import { Router } from "express";
import { listAllCategoriesController } from "../../../../modules/categories/controller/listAllCategoriesController";
import listSpecificCategoryController from "../../../../modules/categories/controller/listSpecificCategoryController";
import createCategoryController from "../../../../modules/categories/controller/createCategoryController";
import updateCategoryController from "../../../../modules/categories/controller/updateCategoryController";
import deleteCategoryController from "../../../../modules/categories/controller/deleteCategoryController";

import { ensureAuthenticated } from "../../middleware/ensureAuthenticate";
import { ensureAdmin } from "@shared/infra/middleware/ensureAdmin";

const categoriesRoutes = Router();

categoriesRoutes.get(
  "/", 
  (req, res) => {
    listAllCategoriesController(req, res)
  }
);

categoriesRoutes.get(
  "/:id", 
  (req, res) => {
      listSpecificCategoryController(req, res)
  }
);

categoriesRoutes.post(
  "/add", 
  ensureAuthenticated,
  ensureAdmin,
  (req, res) => {
      createCategoryController(req, res)
  }
);

categoriesRoutes.put(
  "/update/:id", 
  ensureAuthenticated,
  ensureAdmin,
  (req, res) => {
      updateCategoryController(req, res)
  }
);

categoriesRoutes.delete(
  "/delete/:id", 
  ensureAuthenticated,
  ensureAdmin,
  (req, res) => {
      deleteCategoryController(req, res)
  }
);

export { categoriesRoutes };
