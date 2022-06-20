import { ensureAuthenticated } from "../../../infra/middleware/ensureAuthenticate";
import { Router } from "express";
import { listTransactionsController } from "../../../../modules/transactions/controller/listTransactionsController";

const transactions_historyRoutes = Router();

transactions_historyRoutes.get(
    "/", 
    ensureAuthenticated,
    (req, res) => {
        listTransactionsController(req, res)
    }
);

export { transactions_historyRoutes };