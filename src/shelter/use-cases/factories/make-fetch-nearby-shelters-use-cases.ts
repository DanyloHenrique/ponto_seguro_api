import { PrismaSheltersRepository } from "@/shelter/repositories/prisma/prisma-shelters-repository";
import { FetchNearbySheltersUseCase } from "@/shelter/use-cases/fetch-nearby-shelters";

export function makeFetchNearbySheltersUseCase() {
	const prismaSheltersRepository = new PrismaSheltersRepository();
	const searchNearbyUseCase = new FetchNearbySheltersUseCase(
		prismaSheltersRepository,
	);
	return searchNearbyUseCase;
}
