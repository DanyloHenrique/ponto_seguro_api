import type { Request, Response } from "express";
import { z } from "zod";
import { makeRegisterUseCase } from "@/shelter/use-cases/factories/make-register-use-cases";

export async function createController(req: Request, res: Response) {
	const schameRegisterBody = z.object({
		name: z.string().min(3),
		address: z.string().min(3),
		latitude: z.coerce.number().refine((value) => {
			return Math.abs(value) <= 90;
		}),
		longitude: z.coerce.number().refine((value) => {
			return Math.abs(value) <= 180;
		}),
		capacity_max: z.number(),
		capacity_current: z.number(),
	});

	const { name, address, latitude, longitude, capacity_max, capacity_current } =
		schameRegisterBody.parse(req.body);

	try {
		const registerUseCase = makeRegisterUseCase();

		const { shelter } = await registerUseCase.execute({
			name,
			address,
			latitude,
			longitude,
			capacity_max,
			capacity_current,
		});

		return res.status(201).send({ payload: { id: shelter.id } });
	} catch (error) {
		console.error("🚀 ~ createController ~ error:", error);
		return res.status(409).send({ message: error });
	}
}
