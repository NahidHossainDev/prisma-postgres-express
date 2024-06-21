import cors from "cors";
import express, { Application, Request, Response, json, urlencoded } from "express";
import appRouter from "./router";
const app: Application = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// application router
app.use("/api/v1", appRouter);

// handle not found route
app.use((req: Request, res: Response) => {
	res.status(400).json({
		success: false,
		message: "Not found",
	});
});

export default app;
