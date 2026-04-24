import { Router } from "express";

import { nearbyController } from "@/shelter/http/controller/nearby.controller";
import { createController } from "@/shelter/http/controller/register.controller";
import { searchController } from "@/shelter/http/controller/search.controller";

export const shelterRoutes: Router = Router();

shelterRoutes.get("/nearby", nearbyController);
shelterRoutes.get("/search", searchController);
shelterRoutes.post("/", createController);
