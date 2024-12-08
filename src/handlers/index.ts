import User from "../models/User";
import { Request, Response } from "express";
import slug from "slug";
import { checkPassword, hashpassword } from "../utils/auth";
import { validationResult } from "express-validator";

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      const error = new Error("El usuario Ya esta registrado");
      res.status(409).json({ error: error.message });
      return;
    }
    const handle = slug(req.body.handle);
    const handleExist = await User.findOne({ handle });
    if (handleExist) {
      const error = new Error("El usuario Ya esta registrado");
      res.status(409).json({ error: error.message });
      return;
    }

    const user = new User(req.body);
    // Para enciptar el password
    user.password = await hashpassword(password);
    user.handle = handle; // Tiene un segundo parametro para separar las palabras
    // puede ser - _ '' etc...
    await user.save();

    res.status(201).json({ message: "Respuesta enviada" });
  } catch (error) {
    res.status(500).send("Error al crear usuario");
  }
};

export const login = async (req: Request, res: Response) => {
  let errors = validationResult(req); // Para validaciones de formulario

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const { email, password } = req.body;
  // Revisar si el usuario esta registrado
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("El Usuario no existe");
    res.status(404).json({ error: error.message });
    return;
  }

  // Comprobar password
  const incorrectPassword = await checkPassword(password, user.password);
  if (!incorrectPassword) {
    const error = new Error("Password Incorrecto");
    res.status(401).json({ error: error.message });
    return;
  }
  res.send("Auntenticado...");
};
