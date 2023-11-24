import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const emailRegistryDefs: DocumentNode = gql`
  #graphql
  scalar Scalar
  scalar Date

  input InputEmailRegistry {
    name: String
    email: String
    phoneNumber: String
    description: String
  }

  type EmailRegistry {
    id: Int
    name: String
    email: String
    phoneNumber: String
    description: String
  }

  type SingleEmailRegistry {
    message: String
    data: EmailRegistry
  }

  type EmailRegistryList {
    message: String
    edges: [EmailRegistryEdge]
    pageInfo: PageInfo
  }

  type EmailRegistryEdge {
    node: EmailRegistry
    cursor: String
  }

  type PageInfo {
    startCursor: String
    endCursor: String
    hasNextPage: Boolean
    hasPreviousPage: Boolean
    count: Int
  }
  type CampaignReport {
    message: String
    data: Scalar
  }

  extend type Mutation {
    createEmailRegistry(
      input: InputEmailRegistry!
      sanitize: Boolean
    ): SingleEmailRegistry
    updateEmailRegistry(
      id: Int!
      input: InputEmailRegistry!
      sanitize: Boolean
    ): SingleEmailRegistry
    deleteEmailRegistry(id: Int!): SingleEmailRegistry
  }

  extend type Query {
    emailRegistries(
      first: Int
      last: Int
      after: String
      before: String
      query: String
    ): EmailRegistryList
    emailRegistry(id: Int!): SingleEmailRegistry
    campaignReportReciepientList(campaignId: Int!, reportType: String, messagingPlatform: String, fromDate: Date, toDate: Date, query: String): CampaignReport

  }
`;
