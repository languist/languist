import { inferQueryKeyStore, mergeQueryKeys } from "@lukemorales/query-key-factory";
import { userQueries } from "./user";
import { organizationQueries } from "./organization";

export const queries = mergeQueryKeys(userQueries, organizationQueries);

export type QueryKeys = inferQueryKeyStore<typeof queries>;

export * from './provider'
export * from './user'
export * from './organization'
