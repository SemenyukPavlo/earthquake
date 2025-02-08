import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { Earthquake } from "../entities/Earthquake";

export const resolvers = {
  Query: {
    earthquakes: async (): Promise<Earthquake[]> => {
      return await AppDataSource.getRepository(Earthquake).find({
        order: {id: 'DESC'}
      });
    },
  },
  Mutation: {
    addEarthquake: async (
      _: unknown,
      { location, magnitude, date }: { location: string; magnitude: number; date: string }
    ): Promise<Earthquake> => {
      const repository: Repository<Earthquake> = AppDataSource.getRepository(Earthquake);
      const earthquake = repository.create({ location, magnitude, date: new Date(date) });
      await repository.save(earthquake);
      return earthquake;
    },
    updateEarthquake: async (
      _: unknown,
      { id, location, magnitude, date }: { id: number; location?: string; magnitude?: number; date?: string }
    ): Promise<Earthquake | null> => {
      const repository: Repository<Earthquake> = AppDataSource.getRepository(Earthquake);
      const earthquake = await repository.findOneBy({ id });
      if (!earthquake) throw new Error("Earthquake not found");
      if (location) earthquake.location = location;
      if (magnitude) earthquake.magnitude = magnitude;
      if (date) earthquake.date = new Date(date);
      await repository.save(earthquake);
      return earthquake;
    },
    deleteEarthquake: async (_: unknown, { id }: { id: number }): Promise<boolean> => {
      const repository: Repository<Earthquake> = AppDataSource.getRepository(Earthquake);
      const result = await repository.delete(id);
      return !!result.affected;
    },
  },
};
