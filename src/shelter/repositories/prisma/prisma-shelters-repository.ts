import type { Prisma, Shelter } from "generated/prisma/client";
import { prisma } from "@/lib/prisma";
import type {
	findManyNearbyParams,
	ISheltersRepository,
} from "@/shelter/repositories/IShelters-repository";

export class PrismaSheltersRepository implements ISheltersRepository {
	async create(data: Prisma.ShelterCreateInput) {
		const shelter = await prisma.shelter.create({
			data,
		});

		return shelter;
	}

	async findById(shelterId: string) {
		const shelter = await prisma.shelter.findUnique({
			where: {
				id: shelterId,
			},
		});

		return shelter ?? null;
	}
	async searchMany(query: string, page: number) {
		const shelters = await prisma.shelter.findMany({
			where: {
				name: {
					contains: query,
				},
			},
			take: 20,
			skip: (page - 1) * 20,
		});

		return shelters;
	}
	async findManyNearby({ latitude, longitude }: findManyNearbyParams) {
		const shelters = await prisma.$queryRaw<Shelter[]>`
		SELECT * FROM shelters
		WHERE ( 6371 * acos( cos( radians(${latitude}::float) ) * cos( radians( latitude::float ) ) * cos( radians( longitude::float ) - radians(${longitude}::float) ) + sin( radians(${latitude}::float) ) * sin( radians( latitude::float ) ) ) ) <= 10
		`;

		return shelters;
	}
}
