import type { Shelter } from "generated/prisma/client";
import type { ISheltersRepository } from "@/shelter/repositories/IShelters-repository";

interface FetchSheltersUseCaseRequest {
	query: string;
	page: number;
}

interface FetchSheltersUseCaseResponse {
	shelters: Shelter[];
}

export class FetchSheltersUseCase {
	constructor(private sheltersRepository: ISheltersRepository) {}

	async execute({
		query,
		page,
	}: FetchSheltersUseCaseRequest): Promise<FetchSheltersUseCaseResponse> {
		const shelters = await this.sheltersRepository.searchMany(query, page);
		return { shelters };
	}
}
