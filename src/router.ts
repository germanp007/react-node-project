import { Router } from "express";
import { createAccount, login } from "./handlers";
import { body } from "express-validator";
import { handleInputErrors } from "./middleware/validation";

const router = Router();

// Routing
router.post(
  "/auth/register",
  body("handle").notEmpty().withMessage("El Handle no puede ir vacio"),
  body("name").notEmpty().withMessage("El Nombre no puede ir vacio"),
  body("email").isEmail().withMessage("Email no valido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("El Password es muy corto, minimo 8 caracteres"),
  handleInputErrors,
  createAccount
);

router.post(
  "/auth/login",
  body("email").isEmail().withMessage("Email no valido"),
  body("password").notEmpty().withMessage("El Password es obligatorio"),
  login
);
export default router;
