import "reflect-metadata";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import { AppDataSource } from "./config/database";
import { importCSVData } from "./utils/importCSV";

const startServer = async () => {
  await AppDataSource.initialize();
  console.log("Database connected");

  await importCSVData();

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(4000, () => {
    console.log("Server running on http://localhost:4000/graphql");
  });
};

startServer().catch((error) => {
  console.error("Error starting server:", error);
});
