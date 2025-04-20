import User from "../models/user.model.js";
import { createAccessToken } from "../libs/jwt.js";
import bcrypt from "bcryptjs";

// Registrar nuevo usuario
export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const newUser = new User({
      username,
      email,
      password, // sin hash, el modelo lo manejará
      role: "usuario",
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // ⚠️ false en desarrollo, true en producción
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      user: {
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
        role: userSaved.role,
        createdAt: userSaved.createdAt,
        updatedAt: userSaved.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Password incorrecta" });

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      user: {
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        role: userFound.role,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout
export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

// Obtener perfil
export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound)
    return res.status(400).json({ message: "Usuario no encontrado" });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    role: userFound.role,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};
