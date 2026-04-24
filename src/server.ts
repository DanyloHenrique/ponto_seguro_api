import "dotenv/config";
import { app } from "@/app";
import { env } from "@/env";

app.listen(env.PORT, "0.0.0.0", () =>
	console.log(`Server is running on port ${env.PORT}`),
);
