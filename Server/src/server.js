import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connection from "./config/connectDB";
import cors from "cors";
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8081;
dotenv.config();
configViewEngine(app);
connection();
initWebRoutes(app);
app.listen(PORT, () => {
    console.log(">>> TodoApp Server is running on the port " + PORT);
});
