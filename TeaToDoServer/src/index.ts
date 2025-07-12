import express from "express";
import cors from "cors";
import { CLIENT_URL, PATHS, PORT } from "./config/constants";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./utils/middlewares/errorMiddleware";
import router from "./routes/routes";

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    origin: CLIENT_URL
}));
app.use(cookieParser());
app.use(`/${PATHS.IMAGE_PATHS}`, express.static(PATHS.IMAGE_PATHS));
app.use("/api/v1", router);
app.use(errorMiddleware);

app.listen(PORT, (err) => {
    if (err) console.log(`Something went wrong while trying to connect to the server: ${err}`);
    
    console.log(`Server started at PORT:${PORT}...`);
});