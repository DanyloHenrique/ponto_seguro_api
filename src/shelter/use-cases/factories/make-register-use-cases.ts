import { PrismaSheltersRepository } from "@/shelter/repositories/prisma/prisma-shelters-repository";
import { CreateSheltersUseCase } from "@/shelter/use-cases/create-shelters";

export function makeRegisterUseCase() {
	const prismaSheltersRepository = new PrismaSheltersRepository();
	const registerUseCase = new CreateSheltersUseCase(prismaSheltersRepository);

	return registerUseCase;
}
