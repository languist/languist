import { inferQueryKeyStore, mergeQueryKeys } from "@lukemorales/query-key-factory";
import { userQueries } from "./user";
import { organizationQueries } from "./organization";
import { profileQueries } from "./profile";

export const queries = mergeQueryKeys(userQueries, organizationQueries, profileQueries);

export type QueryKeys = inferQueryKeyStore<typeof queries>;

export * from './provider'
export * from './user'
export * from './organization'
export * from './profile'
