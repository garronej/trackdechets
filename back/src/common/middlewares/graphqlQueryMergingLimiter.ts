import {
  ApolloServerPlugin,
  GraphQLRequestContext
} from "apollo-server-plugin-base";
import { Kind, OperationDefinitionNode } from "graphql";
import { MAX_OPERATIONS_PER_REQUEST } from "./graphqlBatchLimiter";
import { ErrorCode, TDGraphQLError } from "../errors";

export class GraphqlQueryLimit extends TDGraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: ErrorCode.GRAPHQL_MAX_OPERATIONS_ERROR
      }
    });
  }
}

export function graphqlQueryMergingLimiter(): ApolloServerPlugin {
  return {
    async requestDidStart(_: GraphQLRequestContext) {
      return {
        async didResolveOperation(requestContext: GraphQLRequestContext) {
          const operationsDefinitions =
            requestContext?.document?.definitions.filter(
              definition => definition.kind === Kind.OPERATION_DEFINITION
            );

          const mergedQueries = (
            operationsDefinitions as OperationDefinitionNode[]
          ).reduce((accumulator, definition) => {
            const operationsLength =
              definition?.selectionSet?.selections?.length;
            if (isNaN(operationsLength)) return accumulator;
            return accumulator + operationsLength;
          }, 0);

          if (mergedQueries > MAX_OPERATIONS_PER_REQUEST) {
            throw new GraphqlQueryLimit(
              `Batching by query merging is limited to ${MAX_OPERATIONS_PER_REQUEST} operations per query.`
            );
          }
        }
      };
    }
  };
}
