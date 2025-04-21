import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { GraphQLSchema } from "graphql";
import { RootQuery, RootMutation } from "../routes";
import { RequestHandler } from "express";
import { ThrowError } from "../utils/ThrowError";

export async function createApolloMiddleware(): Promise<RequestHandler> {
  const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
  });
  const server = new ApolloServer({
    schema,
    introspection: true,
    includeStacktraceInErrorResponses: process.env.NODE_ENV !== "production",
    formatError: (formattedError, error) => {
      const originalError = error instanceof Error ? error : undefined;

      const baseResponse = {
        message: formattedError.message,
        error: formattedError.extensions?.stack,
        status: false,
        code: "INTERNAL_SERVER_ERROR",
        isToast: true,
      };

      if (originalError instanceof ThrowError) {
        return {
          ...baseResponse,
          code: originalError?.code,
          status: false,
          isToast: originalError?.isToast,
          error: originalError.stack,
        };
      }

      return baseResponse;
    },
  });
  await server.start();
  return expressMiddleware(server, {
    context: async ({ req }) => ({ req }),
  });
}
