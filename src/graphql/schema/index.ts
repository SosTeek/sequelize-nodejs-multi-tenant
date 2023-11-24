import { buildSubgraphSchema } from "@apollo/subgraph";
import {
    emailRegistryResolvers
} from "../resolvers";
import {
    emailRegistryDefs
} from "../typeDefs";

export const schema = buildSubgraphSchema([
    {typeDefs: emailRegistryDefs, resolvers: emailRegistryResolvers}
]);
