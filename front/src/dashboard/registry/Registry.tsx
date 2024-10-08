import { gql, useLazyQuery, useQuery } from "@apollo/client";
import Button from "@codegouvfr/react-dsfr/Button";
import Table from "@codegouvfr/react-dsfr/Table";
import {
  Query,
  QueryRegistryDownloadSignedUrlArgs,
  RegistryDownloadTarget
} from "@td/codegen-ui";
import React, { useState } from "react";

import { InlineLoader } from "../../Apps/common/Components/Loader/Loaders";
import { MEDIA_QUERIES } from "../../common/config";
import { useMedia } from "../../common/use-media";
import { ImportModal } from "./ImportModal";
import RegistryMenu from "./RegistryMenu";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import Badge from "@codegouvfr/react-dsfr/Badge";

const HEADERS = [
  "Date",
  "Import",
  "Déclaration",
  "Déclarant",
  "Entreprise délégataire",
  "Fichier importé",
  "Rapport d'erreur"
];

const GET_REGISTRY_IMPORTS = gql`
  query GetRegistryImports($siret: String!) {
    registryImports(siret: $siret) {
      edges {
        node {
          id
          createdAt
          status
          type
          s3FileKey
          numberOfErrors
          numberOfInsertions
          numberOfEdits
          numberOfCancellations
          createdBy {
            name
          }
        }
      }
    }
  }
`;

const badges = {
  PENDING: (
    <Badge small severity="info">
      En attente
    </Badge>
  ),
  STARTED: (
    <Badge small severity="info">
      En cours
    </Badge>
  ),
  SUCCESSFUL: (
    <Badge small severity="success">
      Complet
    </Badge>
  ),
  PARTIALLY_SUCCESSFUL: (
    <Badge small severity="warning">
      Partiel
    </Badge>
  ),
  FAILED: (
    <Badge small severity="error">
      Refus
    </Badge>
  ),
  CANCELED: (
    <Badge small severity="error">
      Annulé
    </Badge>
  )
};

const REGISTRY_DOWNLOAD_SIGNED_URL = gql`
  query RegistryDownloadSignedUrl(
    $importId: String!
    $target: RegistryDownloadTarget!
  ) {
    registryDownloadSignedUrl(importId: $importId, target: $target) {
      fileKey
      signedUrl
    }
  }
`;

export function Registry() {
  const { siret } = useParams<{ siret: string }>();
  const isMobile = useMedia(`(max-width: ${MEDIA_QUERIES.handHeld})`);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const { loading, error, data, refetch } = useQuery<
    Pick<Query, "registryImports">
  >(
    GET_REGISTRY_IMPORTS,
    { variables: { siret }, pollInterval: 1000 * 10 } // TODO
  );

  const [getDownloadLink] = useLazyQuery<
    Pick<Query, "registryDownloadSignedUrl">,
    Partial<QueryRegistryDownloadSignedUrlArgs>
  >(REGISTRY_DOWNLOAD_SIGNED_URL);

  async function downloadErrorFile(importId: string) {
    const link = await getDownloadLink({
      variables: { importId, target: RegistryDownloadTarget.ErrorFile }
    });
    await downloadFromSignedUrl(link.data?.registryDownloadSignedUrl.signedUrl);
  }
  async function downloadImportFile(importId: string) {
    const link = await getDownloadLink({
      variables: { importId, target: RegistryDownloadTarget.ImportFile }
    });
    await downloadFromSignedUrl(link.data?.registryDownloadSignedUrl.signedUrl);
  }

  const tableData =
    data?.registryImports.edges.map(importData => [
      format(new Date(importData.node.createdAt), "dd/MM/yyyy HH'h'mm"),
      <div>
        {badges[importData.node.status]}
        <div>{importData.node.type}</div>
      </div>,
      <ul>
        {importData.node.numberOfErrors > 0 && (
          <li>
            <strong>{importData.node.numberOfErrors} en erreur</strong>
          </li>
        )}
        {importData.node.numberOfInsertions > 0 && (
          <li>{importData.node.numberOfInsertions} ajoutée(s)</li>
        )}
        {importData.node.numberOfEdits > 0 && (
          <li>{importData.node.numberOfEdits} modifiée(s)</li>
        )}
        {importData.node.numberOfCancellations > 0 && (
          <li>{importData.node.numberOfCancellations} annulée(s)</li>
        )}
      </ul>,
      importData.node.createdBy.name,
      "todo",
      <div className="tw-flex tw-justify-center">
        <Button
          title="Voir le fichier d'import"
          priority="secondary"
          iconId="fr-icon-download-line"
          onClick={() => downloadImportFile(importData.node.id)}
          size="small"
        />
      </div>,
      <div className="tw-flex tw-justify-center">
        {importData.node.numberOfErrors > 0 && (
          <Button
            title="Voir le rapport d'erreur"
            priority="secondary"
            iconId="fr-icon-download-line"
            onClick={() => downloadErrorFile(importData.node.id)}
            size="small"
          />
        )}
      </div>
    ]) ?? [];

  return (
    <div id="companies" className="companies dashboard">
      {!isMobile && <RegistryMenu />}
      <div className="dashboard-content">
        <div className="tw-p-6">
          <div>
            <Button
              priority="primary"
              iconId="fr-icon-upload-line"
              iconPosition="right"
              onClick={() => setIsImportModalOpen(true)}
            >
              Importer
            </Button>
          </div>
          {loading && <InlineLoader />}
          {error && (
            <Alert
              closable
              description={error.message}
              severity="error"
              title="Erreur lors du chargement"
            />
          )}
          {data && tableData.length === 0 && (
            <p>Aucun import n'a encore été réalisé</p>
          )}
          {data && tableData.length > 0 && (
            <div>
              <Table
                bordered
                fixed
                caption="Historique des importations"
                data={tableData}
                headers={HEADERS}
              />
            </div>
          )}
        </div>
      </div>

      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => {
          setIsImportModalOpen(false);
          refetch();
        }}
      />
    </div>
  );
}

async function downloadFromSignedUrl(signedUrl: string | undefined) {
  if (!signedUrl) {
    return;
  }

  const response = await fetch(signedUrl);
  if (!response.ok) {
    throw new Error(`Error fetching file: ${response.statusText}`);
  }

  const blob = await response.blob();
  const file = window.URL.createObjectURL(blob);
  window.location.assign(file);
}
