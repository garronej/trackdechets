import { gql } from "@apollo/client";
import {
  detailFormFragment,
  fullFormFragment,
  fullDasriFragment,
  dashboardDasriFragment,
  vhuFragment,
  bsdaFragment,
} from "./fragments";

// full fledged bsd to display in detailled views
export const GET_DETAIL_FORM = gql`
  query Form($id: ID) {
    form(id: $id) {
      ...DetailFormFragment
    }
  }
  ${detailFormFragment}
`;

export const GET_DETAIL_DASRI = gql`
  query Bsdasri($id: ID!) {
    bsdasri(id: $id) {
      ...DasriFragment
    }
  }
  ${fullDasriFragment}
`;

export const GET_DETAIL_DASRI_WITH_METADATA = gql`
  query Bsdasri($id: ID!) {
    bsdasri(id: $id) {
      ...DasriFragment
      metadata {
        errors {
          message
          requiredFor
        }
      }
    }
  }
  ${fullDasriFragment}
`;

export const GET_DASRI_METADATA = gql`
  query Bsdasri($id: ID!) {
    bsdasri(id: $id) {
      metadata {
        errors {
          message
          requiredFor
        }
      }
    }
  }
`;

export const GET_BSDS = gql`
  query GetBsds(
    $after: String
    $first: Int
    $clue: String
    $where: BsdWhere
    $orderBy: OrderBy
  ) {
    bsds(
      after: $after
      first: $first
      clue: $clue
      where: $where
      orderBy: $orderBy
    ) {
      edges {
        node {
          ... on Form {
            ...FullForm
          }
          ... on Bsdasri {
            ...DashboardDasriFragment
          }
          ... on Bsvhu {
            ...VhuFragment
          }
          ... on Bsff {
            id
            isDraft
            bsffStatus: status
            bsffEmitter: emitter {
              company {
                siret
                name
              }
            }
            bsffTransporter: transporter {
              company {
                siret
                name
              }
            }
            bsffDestination: destination {
              company {
                siret
                name
              }
            }
            waste {
              code
              description
            }
            packagings {
              numero
            }
          }
          ... on Bsda {
            ...BsdaFragment
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
  ${fullFormFragment}
  ${dashboardDasriFragment}
  ${vhuFragment}
  ${bsdaFragment}
`;
