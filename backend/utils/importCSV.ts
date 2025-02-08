import fs from "fs";
import { join } from "path";
import csvParser from "csv-parser";
import { AppDataSource } from "../config/database";
import { Earthquake } from "../entities/Earthquake";

export const importCSVData = async () => {
  const repository = AppDataSource.getRepository(Earthquake);
  const earthquakes: Earthquake[] = [];

  await repository.delete({});

  fs.createReadStream(join(__dirname, "./data/earthquakes.csv"))
    .pipe(csvParser())
    .on("data", (row) => {
      const earthquake = new Earthquake();
      earthquake.location = `${row.Latitude}; ${row.Longitude}`;
      earthquake.magnitude = parseFloat(row.Magnitude);
      earthquake.date = new Date(row.DateTime);
      earthquakes.push(earthquake);
    })
    .on("end", async () => {
      await repository.save(earthquakes);
      console.log("CSV data imported successfully");
    });
};
