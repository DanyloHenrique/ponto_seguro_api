import express, { type Application } from "express";

const app: Application = express();

app.use(express.json());

app.get("/ping", (_request, response) => {
	return response.send({ message: "pong" });
});


export { app };
