import express from 'express'
import { sequlize } from './dbconfig'
import router from './routes'
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.use("/v1/", router);

sequlize.sync({alter: true, force: false}).then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})