import { Router } from "express";
import LoginController from "../controllers/LoginController";
import UserController from "../controllers/UserController";

const router = Router();

router.post(
  "/register",
  UserController.register
);

router.post(
 "/login",
 LoginController.handle
);

export default router;