import User from "../models/User";

export const createAccount = async (req, res) => {
  try {
    await User.create(req.body);
    res.json({ message: "Respuesta enviada" });

    /*otra forma de hacerlo es instanciar user
      const user = new User(req.body)
       user.save() */
  } catch (error) {
    res.status(500).send("Error al crear usuario");
  }
};
