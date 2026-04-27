import type { Prisma, Shelter } from "generated/prisma/client";

export interface findManyNearbyParams {
	latitude: number;
	longitude: number;
}

export interface ISheltersRepository {
	create(data: Prisma.ShelterCreateInput): Promise<Shelter>;
	findById(shelterId: string): Promise<Shelter | null>;
    searchMany(query: string, page: number): Promise<Shelter[]>;
	findManyNearby({ latitude, longitude }: findManyNearbyParams): Promise<Shelter[]>;
}
