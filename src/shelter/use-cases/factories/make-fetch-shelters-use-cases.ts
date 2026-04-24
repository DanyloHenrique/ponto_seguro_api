import { PrismaSheltersRepository } from "@/shelter/repositories/prisma/prisma-shelters-repository";
import { FetchSheltersUseCase } from "@/shelter/use-cases/fetch-shelters";

export function makeFetchSheltersUseCase() {
	const prismaSheltersRepository = new PrismaSheltersRepository();
	const searchSheltersUseCase = new FetchSheltersUseCase(
		prismaSheltersRepository,
	);
	return searchSheltersUseCase;
}
