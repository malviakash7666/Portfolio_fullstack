import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import sequelize from "./src/config/db.js";
import authRoutes from "./src/modules/user/auth.Routes.js";


dotenv.config();


const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
// app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.use("/api/auth", authRoutes);
// app.get("/api/profile", protect, (req, res) => {
//   res.json({ user: req.user });
// });

sequelize.authenticate().then(() => {
    console.log("DB connected ✅");
    
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT} 🚀`);
    });
});