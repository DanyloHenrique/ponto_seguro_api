import { PrismaSheltersRepository } from "@/shelter/repositories/prisma/prisma-shelters-repository";
import { GetShelterUseCase } from "@/shelter/use-cases/get-shelter";

export function makeSearchSheltersUseCase() {
	const prismaSheltersRepository = new PrismaSheltersRepository();
	const searchSheltersUseCase = new GetShelterUseCase(prismaSheltersRepository);
	return searchSheltersUseCase;
}
