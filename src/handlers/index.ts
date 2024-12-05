import User from "../models/User";
import { Request, Response } from "express";
import slug from "slug";
import { hashpassword } from "../utils/auth";

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
