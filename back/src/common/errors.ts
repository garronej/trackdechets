import { GraphQLError, SourceLocation, ASTNode, Source } from "graphql";

export enum ErrorCode {
  UNAUTHENTICATED = "UNAUTHENTICATED",
  FORBIDDEN = "FORBIDDEN",
  BAD_USER_INPUT = "BAD_USER_INPUT",
  GRAPHQL_VALIDATION_FAILED = "GRAPHQL_VALIDATION_FAILED",
  GRAPHQL_PARSE_FAILED = "GRAPHQL_PARSE_FAILED"
}

export class DomainError extends Error implements GraphQLError {
  readonly locations: SourceLocation[];
  readonly path: (string | number)[];
  readonly nodes: ASTNode[];
  readonly source: Source;
  readonly positions: number[];

  public originalError;
  public extensions: Record<string, any>;

  constructor(
    message: string,
    code?: ErrorCode,
    properties?: Record<string, any>
  ) {
    super(message);

    this.extensions = { isDomainError: true, code, ...properties };
  }
}
