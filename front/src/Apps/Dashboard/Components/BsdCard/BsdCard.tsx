import React, { useState } from "react";

import { formatDate } from "../../../../common/datetime";
import Badge from "../Badge/Badge";
import InfoWithIcon from "../InfoWithIcon/InfoWithIcon";
import { InfoIconCode } from "../InfoWithIcon/infoWithIconTypes";
import { BsdCardProps } from "./bsdCardTypes";
import WasteDetails from "../WasteDetails/WasteDetails";
import {
  canPublishBsd,
  getBsdView,
  getCtaLabelFromStatus,
  getWorkflowLabel,
} from "../../dashboardServices";
import BsdAdditionalActionsButton from "../BsdAdditionalActionsButton/BsdAdditionalActionsButton";
import Actors from "../Actors/Actors";
import {
  useBsdaDownloadPdf,
  useBsdasriDownloadPdf,
  useBsddDownloadPdf,
  useBsffDownloadPdf,
  useBsvhuDownloadPdf,
} from "Apps/Dashboard/Components/Pdf/useDownloadPdf";
import { BsdType } from "generated/graphql/types";

import "./bsdCard.scss";
import {
  useBsdaDuplicate,
  useBsdasriDuplicate,
  useBsddDuplicate,
  useBsffDuplicate,
  useBsvhuDuplicate,
} from "Apps/Dashboard/Components/Duplicate/useDuplicate";
import { Loader } from "common/components";
import { BsdDisplay } from "Apps/Common/types/bsdTypes";
import DeleteModal from "../DeleteModal/DeleteModal";

function BsdCard({
  bsd,
  bsdCurrentTab,
  currentSiret,
  onValidate,
  onOverview,
  onUpdate,
  onRevision,
  onBsdSuite,
}: BsdCardProps) {
  const bsdDisplay = getBsdView(bsd);

  const options = {
    variables: { id: bsd.id },
  };
  const [downloadBsddPdf] = useBsddDownloadPdf({
    ...options,
  });
  const [downloadBsdaPdf] = useBsdaDownloadPdf({
    ...options,
  });
  const [downloadBsdasriPdf] = useBsdasriDownloadPdf({
    ...options,
  });
  const [downloadBsffPdf] = useBsffDownloadPdf({
    ...options,
  });
  const [downloadBsvhuPdf] = useBsvhuDownloadPdf({
    ...options,
  });

  const [duplicateBsdd, { loading: isDuplicatingBsdd }] = useBsddDuplicate({
    ...options,
  });
  const [duplicateBsda, { loading: isDuplicatingBsda }] = useBsdaDuplicate({
    ...options,
  });
  const [duplicateBsdasri, { loading: isDuplicatingBsdasri }] =
    useBsdasriDuplicate({
      ...options,
    });
  const [duplicateBsff, { loading: isDuplicatingBsff }] = useBsffDuplicate({
    ...options,
  });
  const [duplicateBsvhu, { loading: isDuplicatingBsvhu }] = useBsvhuDuplicate({
    ...options,
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isDuplicating =
    isDuplicatingBsdd ||
    isDuplicatingBsda ||
    isDuplicatingBsdasri ||
    isDuplicatingBsff ||
    isDuplicatingBsvhu;

  const updatedAt = bsdDisplay?.updatedAt
    ? formatDate(bsdDisplay.updatedAt)
    : "";

  const ctaPrimaryLabel = bsdDisplay?.type
    ? getCtaLabelFromStatus(bsdDisplay, currentSiret, bsdCurrentTab)
    : "";

  const handleValidationClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onValidate(bsd);
  };

  const onPdf = (bsd: BsdDisplay) => {
    if (bsd.type === BsdType.Bsdd) {
      downloadBsddPdf();
    }
    if (bsd.type === BsdType.Bsda) {
      downloadBsdaPdf();
    }
    if (bsd.type === BsdType.Bsdasri) {
      downloadBsdasriPdf();
    }
    if (bsd.type === BsdType.Bsff) {
      downloadBsffPdf();
    }
    if (bsd.type === BsdType.Bsvhu) {
      downloadBsvhuPdf();
    }
  };

  const onDuplicate = (bsd: BsdDisplay) => {
    if (bsd.type === BsdType.Bsdd) {
      duplicateBsdd();
    }
    if (bsd.type === BsdType.Bsda) {
      duplicateBsda();
    }
    if (bsd.type === BsdType.Bsdasri) {
      duplicateBsdasri();
    }
    if (bsd.type === BsdType.Bsff) {
      duplicateBsff();
    }
    if (bsd.type === BsdType.Bsvhu) {
      duplicateBsvhu();
    }
  };

  const onCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const onDelete = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <div className="bsd-card" tabIndex={0}>
        {bsdDisplay && (
          <>
            <div className="bsd-card__header">
              <p className="bsd-number">N°: {bsdDisplay.readableid}</p>
              {bsdDisplay?.isTempStorage && (
                <InfoWithIcon labelCode={InfoIconCode.TempStorage} />
              )}
              {updatedAt && (
                <InfoWithIcon
                  labelCode={InfoIconCode.LastModificationDate}
                  date={updatedAt}
                />
              )}
              {bsdDisplay?.emittedByEcoOrganisme && (
                <InfoWithIcon labelCode={InfoIconCode.EcoOrganism} />
              )}
              <p className="workflow-type">
                {getWorkflowLabel(bsdDisplay.bsdWorkflowType)}
              </p>
            </div>
            <div className="bsd-card__content">
              <div className="bsd-card__content__infos">
                <div className="bsd-card__content__infos__status">
                  <Badge
                    status={bsdDisplay.status}
                    isDraft={bsdDisplay.isDraft}
                    bsdType={bsdDisplay.type}
                  />
                </div>
                <div className="bsd-card__content__infos__other">
                  <WasteDetails
                    wasteType={bsdDisplay.type}
                    code={bsdDisplay.wasteDetails.code!}
                    name={bsdDisplay.wasteDetails.name!}
                  />

                  <Actors
                    emitterName={bsdDisplay.emitter?.company?.name!}
                    transporterName={bsdDisplay.transporter?.company?.name!}
                    destinationName={bsdDisplay.destination?.company?.name!}
                  />
                </div>
              </div>
              <div className="bsd-card__content__cta">
                {canPublishBsd(bsdDisplay, currentSiret) && ctaPrimaryLabel && (
                  <button
                    data-testid="bsd-card-btn-primary"
                    type="button"
                    className="fr-btn fr-btn--sm"
                    onClick={handleValidationClick}
                  >
                    {ctaPrimaryLabel}
                  </button>
                )}

                <BsdAdditionalActionsButton
                  bsd={bsdDisplay}
                  currentSiret={currentSiret}
                  onOverview={onOverview!}
                  onDelete={onDelete}
                  onDuplicate={onDuplicate}
                  onUpdate={onUpdate!}
                  onRevision={onRevision!}
                  onPdf={onPdf}
                  onBsdSuite={onBsdSuite}
                />
              </div>
            </div>

            <DeleteModal
              bsdId={bsdDisplay.id}
              bsdType={bsdDisplay.type}
              isOpen={isDeleteModalOpen}
              onClose={onCloseDeleteModal}
            />
          </>
        )}
      </div>
      {isDuplicating && <Loader />}
    </>
  );
}

export default BsdCard;
