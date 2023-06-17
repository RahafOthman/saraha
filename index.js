import express from "express";
import initApp from "./src/Modules/app.router.js";
import * as dotenv from 'dotenv';

const app = express();
const port= 3000 ; 
dotenv.config();
initApp(app, port, express);


