import mongoose from "mongoose";
import bcrypt from "bcryptjs";  // Necesitarás instalar bcryptjs para el hashing de contraseñas

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "usuario"],
      default: "usuario",
    },
  },
  {
    timestamps: true,
  }
);

// Middleware para encriptar la contraseña antes de guardarla
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);  // Genera un "salt" para el hash
      this.password = await bcrypt.hash(this.password, salt);  // Hashea la contraseña
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Método para comparar contraseñas (para verificar durante el login)
userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);  // Compara la contraseña ingresada con el hash almacenado
};

export default mongoose.model("User", userSchema);
