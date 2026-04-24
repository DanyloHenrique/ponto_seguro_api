import { randomUUID } from "node:crypto";
import type { Prisma, Shelter } from "generated/prisma/client";
import { Decimal } from "generated/prisma/internal/prismaNamespace";
import type {
	findManyNearbyParams,
	ISheltersRepository,
} from "@/shelter/repositories/IShelters-repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

const MAX_DISTANCE_IN_KM_NEARBY = 10;

export class InMemorySheltersRepository implements ISheltersRepository {
	shelters: Shelter[] = [];

	async create(data: Prisma.ShelterCreateInput) {
		const shelter: Shelter = {
			id: randomUUID(),
			name: data.name,
			address: data.address,
			latitude: new Decimal(data.latitude.toString()),
			longitude: new Decimal(data.longitude.toString()),
			capacity_max: data.capacity_max,
			capacity_current: data.capacity_current,
		};

		this.shelters.push(shelter);

		return shelter;
	}

	async findById(shelterId: string) {
		const shelter = this.shelters.find((shelter) => shelter.id === shelterId);

		return shelter ?? null;
	}
	async searchMany(query: string, page: number): Promise<Shelter[]> {
		const shelters = this.shelters
			.filter((shelter) => shelter.name.includes(query))
			.slice((page - 1) * 20, page * 20);

		return shelters;
	}

	async findManyNearby({ latitude, longitude }: findManyNearbyParams) {
		const shelters = this.shelters.filter((shelter) => {
			const distance = getDistanceBetweenCoordinates(
				{ latitude, longitude },
				{
					latitude: shelter.latitude.toNumber(),
					longitude: shelter.longitude.toNumber(),
				},
			);
			return distance <= MAX_DISTANCE_IN_KM_NEARBY;
		});

		return shelters;
	}
}
