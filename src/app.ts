import express, { type Application } from "express";
import { shelterRoutes } from "./shelter/http/controller/routes";

const app: Application = express();

app.use(express.json());

app.get("/ping", (_request, response) => {
	return response.send({ message: "pong" });
});

app.use("/shelters", shelterRoutes);

export { app };
