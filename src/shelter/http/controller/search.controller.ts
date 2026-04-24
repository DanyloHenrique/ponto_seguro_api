import type { Request, Response } from "express";
import z from "zod";
import { makeFetchSheltersUseCase } from "@/shelter/use-cases/factories/make-fetch-shelters-use-cases";

export async function searchController(req: Request, res: Response) {
	const searchSheltersQueryParams = z.object({
		query: z.string(),
		page: z.coerce.number().min(1).default(1),
	});

	const { query, page } = searchSheltersQueryParams.parse(req.query);

	const searchSheltersUseCase = makeFetchSheltersUseCase();

	try {
		const { shelters } = await searchSheltersUseCase.execute({ query, page });

		return res.status(200).send({ shelters });
	} catch (error) {
		return res.status(409).send({ message: error });
	}
}
