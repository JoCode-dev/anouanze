import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Import Routes
import eventRoutes from "./routes/event.routes.js";
import userRoutes from "./routes/user.routes.js";
import paroisseRoutes from "./routes/paroisse.routes.js";
import paroissesRoutes from "./routes/paroisses.routes.js";
import actuRoutes from "./routes/actus.routes.js";
import demandesRoutes from "./routes/demandes.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Using Routes
app.use("/user", userRoutes);
app.use("/paroisse", paroisseRoutes);
app.use("/paroisses", paroissesRoutes);
app.use("/event", eventRoutes);
app.use("/actus", actuRoutes);
app.use("/demandes", demandesRoutes);

// Heroku Deployment
app.get("/", (req, res) => {
  res.send("Hello to Anouanze");
});

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  });
