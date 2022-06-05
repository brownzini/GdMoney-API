import { Router } from "express";

const usersRoutes = Router();

usersRoutes.get("/profile", (req, res) => {
    res.status(200).json({
      name: "Funcionoukkkkk"
    })
});

export { usersRoutes };
