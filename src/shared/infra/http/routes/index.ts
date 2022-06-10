import { Router } from "express";

import { usersRoutes } from "./users.routes";
import { persistenceRoutes } from "./persistence.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { productsRoutes } from "./products.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/persistence", persistenceRoutes);
router.use("/products", productsRoutes);
router.use(authenticateRoutes);

export { router };
