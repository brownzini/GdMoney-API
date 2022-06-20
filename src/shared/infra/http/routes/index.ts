import { Router } from "express";

import { usersRoutes } from "./users.routes";
import { persistenceRoutes } from "./persistence.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { productsRoutes } from "./products.routes";
import { categoriesRoutes } from "./categories.routes";
import { transactions_historyRoutes } from "./transactions_history.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/persistence", persistenceRoutes);
router.use("/products", productsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/transactions", transactions_historyRoutes);
router.use(authenticateRoutes);

export { router };