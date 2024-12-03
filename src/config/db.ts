import mongoose from "mongoose";
import colors from "colors";
export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      colors.bgCyan.bold(
        `Base de Datos Conectada! ${connection.host}:${connection.port}`
      )
    );
  } catch (error) {
    console.log(colors.bgRed.white.bold(error.message));
    process.exit(1);
  }
};
