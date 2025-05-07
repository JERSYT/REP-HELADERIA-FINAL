// controllers/dashboard.controller.js
import User from "../models/user.model.js";

export const adminDashboard = async (req, res) => {
  try {
    const users = await User.find().select("-password").lean();
    const totalUsers = users.length;

    res.json({
      message: "Bienvenido al panel de administrador",
      totalUsers,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
