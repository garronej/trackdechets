import React from "react";
import { BsffPackagingType, BsffType } from "@prisma/client";
import {
  Document,
  formatDate,
  FormCompanyFields,
  SignatureStamp,
  SignatureStampSmall,
  TRANSPORT_MODE_LABELS
} from "../../common/pdf";
import {
  Bsff,
  BsffPackaging,
  BsffFicheIntervention
} from "../../generated/graphql/types";
import { BSFF_WASTES } from "../../common/constants";
import { extractPostalCode } from "../../utils";

type Props = {
  bsff: Bsff & { packagings: BsffPackaging[] } & {
    ficheInterventions: BsffFicheIntervention[];
  } & { previousBsffs: (Bsff & { packagings: BsffPackaging[] })[] };
  qrCode: string;
};

export function BsffPdf({ bsff, qrCode }: Props) {
  const hasFicheInterventions = bsff.ficheInterventions?.length > 0;
  const hasPreviousBsffs = bsff.previousBsffs?.length > 0;

  return (
    <Document title={bsff.id}>
      <div className="Page">
        <Header qrCode={qrCode} />
        <BsffId bsff={bsff} />
        <BsffEmitterType bsff={bsff} />
        <div className="BoxRow">
          <BsffEmitter bsff={bsff} />
          <BsffDestination bsff={bsff} />
        </div>
        <BsffPackagings bsff={bsff} />
        <div className="BoxRow">
          <BsffWasteCode bsff={bsff} />
          <BsffQuantity bsff={bsff} />
        </div>
        <BsffEmission bsff={bsff} />
        <BsffTransporter bsff={bsff} />
        {bsff.packagings?.length > 1 ? (
          <BsffPackagingAcceptationOperation bsff={bsff} />
        ) : (
          <>
            <div className="BoxRow">
              <BsffOnePackagingAcceptation
                bsff={bsff}
                packaging={bsff.packagings[0]}
              />
              <BsffOnePackagingOperation packaging={bsff.packagings[0]} />
            </div>
            <BsffOnePackagingOperationNextDestination
              packaging={bsff.packagings[0]}
            />
          </>
        )}
      </div>
      {(hasFicheInterventions || hasPreviousBsffs) && (
        <div className="Page">
          {" "}
          <h3 className="TextAlignCenter mb-30">
            Traçabilité associée au BSD n° {bsff.id}
          </h3>
          {hasFicheInterventions && (
            <BsffFicheInterventions
              ficheInterventions={bsff.ficheInterventions}
            />
          )}
          {hasPreviousBsffs && <PreviousBsffsTable bsff={bsff} />}
        </div>
      )}
    </Document>
  );
}

function Header({ qrCode }: Pick<Props, "qrCode">) {
  return (
    <div className="BoxRow">
      {/* 3-parts header */}
      <div className="BoxCol TextAlignCenter">
        <p>Art. R. 541-45 du code de l’environnement.</p>
        <p>Arrêté du 29 février 2016</p>
        <p>Arrêté du 26 juillet 2022</p>
      </div>
      <div className="BoxCol TextAlignCenter">
        <p>Ministère de la Transition Écologique</p>
        <h1>
          Bordereau de suivi de déchets pour les déchets dangereux de fluides
          frigorigènes
        </h1>
        <p>
          et autres déchets dangereux de fluides en contenants sous pression
        </p>
        <p>Récépissé Trackdéchets</p>
      </div>
      <div className="BoxCol TextAlignCenter">
        <div className="QrCode" dangerouslySetInnerHTML={{ __html: qrCode }} />
      </div>
      {/* End 3-parts header */}
    </div>
  );
}

function BsffId({ bsff }: Pick<Props, "bsff">) {
  return (
    <div className="BoxRow">
      <div className="BoxCol">
        <p>
          <strong>N° Bordereau :</strong> {bsff.id}
        </p>
      </div>
    </div>
  );
}

function BsffEmitterType({ bsff }: Pick<Props, "bsff">) {
  return (
    <div className="BoxRow">
      <div className="BoxCol">
        <p>
          <strong>L'émetteur du BSFF est : </strong>
        </p>
        <p>
          <input
            type="checkbox"
            checked={bsff.type === BsffType.COLLECTE_PETITES_QUANTITES}
            readOnly
          />{" "}
          Un opérateur qui collecte des déchets dangereux de fluides
          frigorigènes (ou autres déchets dangereux de fluides) lors
          d'opérations sur les équipements en contenant de ses clients
        </p>
        <p>
          <input
            type="checkbox"
            checked={bsff.type === BsffType.TRACER_FLUIDE}
            readOnly
          />{" "}
          Un autre détenteur de déchets
        </p>
        <p>
          <input
            type="checkbox"
            checked={bsff.type === BsffType.GROUPEMENT}
            readOnly
          />{" "}
          Une installation dans le cadre d'un regroupement
        </p>
        <p>
          <input
            type="checkbox"
            checked={bsff.type === BsffType.REEXPEDITION}
            readOnly
          />{" "}
          Une installation dans le cadre d'une réexpédition
        </p>
        <p>
          <input
            type="checkbox"
            checked={bsff.type === BsffType.RECONDITIONNEMENT}
            readOnly
          />{" "}
          Une installation dans le cadre d'un reconditionnement
        </p>
      </div>
    </div>
  );
}

function BsffEmitter({ bsff }: Pick<Props, "bsff">) {
  return (
    <div className="BoxCol">
      <p>
        <strong>1. Émetteur du bordereau</strong>
        <FormCompanyFields company={bsff.emitter?.company} />
      </p>
    </div>
  );
}

function BsffDestination({ bsff }: Pick<Props, "bsff">) {
  return (
    <div className="BoxCol">
      <p>
        <strong>2. Installation de destination</strong>
        <FormCompanyFields company={bsff.destination?.company} />
        <p>CAP (le cas échéant) : {bsff.destination?.cap}</p>
        <p>
          Code de l'opération d'élimination ou valorisation prévue :{" "}
          {bsff.destination?.plannedOperationCode}
        </p>
      </p>
    </div>
  );
}

function BsffPackagings({ bsff }: Pick<Props, "bsff">) {
  return (
    <div className="BoxRow">
      <div className="BoxCol">
        {bsff.packagings.length <= 10 ? (
          <>
            <p>
              <strong>3. Contenant(s) (type, numéro, volume, poids)</strong>
            </p>
            <div>
              {[...bsff.packagings].reverse().map(packaging => (
                <BsffPackagingFull key={packaging.id} packaging={packaging} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div>
              <strong>3. Contenant(s) (type, numéro)</strong>
            </div>
            <div>
              {[...bsff.packagings]
                .reverse()
                .map(packaging => bsffPackagingLight(packaging))
                .join(" - ")}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function BsffPackagingFull({ packaging }: { packaging: BsffPackaging }) {
  return (
    <div>
      {packaging.type === BsffPackagingType.AUTRE ? (
        <span>{packaging.other} </span>
      ) : (
        <span>{packaging.type} </span>
      )}
      <span>n°{packaging.numero} </span>
      <span>{packaging.volume}L </span>
      <span>{packaging.weight}kg</span>
    </div>
  );
}

function bsffPackagingLight(packaging: BsffPackaging) {
  return `${
    packaging.type === BsffPackagingType.AUTRE
      ? packaging.other
      : packaging.type
  } n°${packaging.numero}`;
}

function BsffWasteCode({ bsff }: Pick<Props, "bsff">) {
  return (
    <div className="BoxCol">
      <p>
        <strong>4. Code déchet</strong>
      </p>
      <div>
        <div>
          <strong>{bsff.waste?.code} </strong>
          <span>
            {BSFF_WASTES.find(w => w.code === bsff.waste?.code)?.description}
          </span>
        </div>
        <div>Dénomination usuelle du déchet : {bsff?.waste?.description}</div>
        <div>Code UN / Mention ADR : {bsff?.waste?.adr}</div>
      </div>
    </div>
  );
}

function BsffQuantity({ bsff }: Pick<Props, "bsff">) {
  return (
    <div className="BoxCol">
      <p>
        <strong>5. Quantité totale</strong>
      </p>
      {bsff.weight && (
        <>
          <div>
            <span>
              <input
                type="checkbox"
                checked={!bsff.weight?.isEstimate}
                readOnly
              />{" "}
              Réelle
            </span>{" "}
            <span>
              <input
                type="checkbox"
                checked={bsff.weight?.isEstimate}
                readOnly
              />{" "}
              Estimée
            </span>
          </div>
          <div>Kilogramme(s) : {bsff.weight.value}</div>
        </>
      )}
    </div>
  );
}

function BsffEmission({ bsff }: Pick<Props, "bsff">) {
  return (
    <div className="BoxRow">
      <div className="BoxCol">
        <p>
          <strong>6. Déclaration générale de l'émetteur du bordereau</strong>
        </p>
        <div>
          Je soussigné (nom, prénom) :{" "}
          {bsff.emitter?.emission?.signature?.author}
        </div>
        <div>
          Certifie que les renseignements portés dans les cadres ci-dessus sont
          exacts et de bonne foi
        </div>
        <div>Date : {formatDate(bsff.emitter?.emission?.signature?.date)}</div>
        <div>Signature :</div>
        {bsff.emitter?.emission?.signature?.date && <SignatureStamp />}
      </div>
    </div>
  );
}

function BsffTransporter({ bsff }: Pick<Props, "bsff">) {
  return (
    <div className="BoxRow">
      <div className="BoxCol">
        <p>
          <strong>7. Transporteur</strong>
        </p>
        <div className="Row">
          <div className="Col">
            <FormCompanyFields company={bsff.transporter?.company} />
          </div>
          <div className="Col">
            {bsff.transporter?.company?.siret &&
            !bsff.transporter?.recepisse ? (
              <p>
                <input type="checkbox" checked readOnly /> Je déclare être
                exempté de récépissé au titre de l'article R.541-50 du code de
                l'environnement
              </p>
            ) : (
              <p>
                Récépissé n° : {bsff.transporter?.recepisse?.number}
                <br />
                Département : {bsff.transporter?.recepisse?.department}
                <br />
                Limite de validité :{" "}
                {formatDate(bsff.transporter?.recepisse?.validityLimit)}
              </p>
            )}
            <p>
              Mode de transport :{" "}
              {bsff?.transporter?.transport?.mode
                ? TRANSPORT_MODE_LABELS[bsff?.transporter?.transport?.mode]
                : null}
              <br />
              Immatriculation(s) : {bsff.transporter?.transport?.plates}
              <br />
              Date de prise en charge :{" "}
              {formatDate(bsff.transporter?.transport?.takenOverAt)}
              <br />
              Nom et signature :{" "}
              {bsff?.transporter?.transport?.signature?.author}
            </p>
            {bsff?.transporter?.transport?.signature?.date && (
              <SignatureStamp />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function BsffPackagingAcceptation({
  bsff,
  packaging
}: {
  bsff: Bsff;
  packaging: BsffPackaging;
}) {
  const isAccepted = packaging?.acceptation?.status === "ACCEPTED";
  const isRefused = packaging?.acceptation?.status === "REFUSED";
  return (
    <div>
      <div>
        Nom du responsable : {packaging?.acceptation?.signature?.author}
      </div>
      <div>
        Date de présentation sur site :{" "}
        {formatDate(bsff?.destination?.reception?.date)}
      </div>
      {isAccepted && (
        <div>
          Quantité réelle présentée : {packaging?.acceptation?.weight} kg
        </div>
      )}

      <div>
        Contenant accepté : <input type="checkbox" checked={isAccepted} /> Oui
        {"  "}
        <input type="checkbox" checked={isRefused} /> Non
      </div>
      <div>
        Description du déchet : {packaging?.acceptation?.wasteCode}{" "}
        {packaging?.acceptation?.wasteDescription}
      </div>
      {isRefused ? (
        <div> Date de refus : {formatDate(packaging?.acceptation?.date)}</div>
      ) : (
        <div>
          Date d'acceptation : {formatDate(packaging?.acceptation?.date)}
        </div>
      )}
      {isRefused && (
        <div>Motif du refus : {packaging?.acceptation?.refusalReason}</div>
      )}
    </div>
  );
}

function BsffOnePackagingAcceptation({
  bsff,
  packaging
}: {
  bsff: Bsff;
  packaging: BsffPackaging;
}) {
  return (
    <div className="BoxCol">
      <p>
        <strong>8. Réception et acceptation</strong>
      </p>
      <BsffPackagingAcceptation bsff={bsff} packaging={packaging} />
      <div>Signature : </div>
      {packaging?.acceptation?.signature?.date && <SignatureStamp />}
    </div>
  );
}

function BsffOnePackagingOperation({
  packaging
}: {
  packaging: BsffPackaging;
}) {
  return (
    <div className="BoxCol">
      <p>
        <strong>9. Réalisation de l'opération</strong>
      </p>
      <div>
        Récupération ou régénération des solvants{" "}
        <input type="checkbox" checked={packaging?.operation?.code === "R2"} />{" "}
        R 2
      </div>
      <div>
        Recyclage ou récupération d’autres matières inorganiques{" "}
        <input type="checkbox" checked={packaging?.operation?.code === "R5"} />{" "}
        R 5
      </div>
      <div>
        Recyclage ou récupération des substances organiques R 3 Incinération à
        terre{" "}
        <input type="checkbox" checked={packaging?.operation?.code === "D10"} />{" "}
        D 10
      </div>
      <div>
        {" "}
        Groupement de contenants{" "}
        <input
          type="checkbox"
          checked={packaging?.operation?.code === "R12"}
        />{" "}
        R12{" "}
        <input type="checkbox" checked={packaging?.operation?.code === "D13"} />{" "}
        D 13
      </div>
      <div>
        {" "}
        Reconditionnement dans un nouveau contenant{" "}
        <input
          type="checkbox"
          checked={packaging?.operation?.code === "R12"}
        />{" "}
        R 12{" "}
        <input type="checkbox" checked={packaging?.operation?.code === "D14"} />{" "}
        D 14
      </div>
      <div>
        {" "}
        Entreposage provisoire avant réexpédition{" "}
        <input
          type="checkbox"
          checked={packaging?.operation?.code === "R13"}
        />{" "}
        R13{" "}
        <input type="checkbox" checked={packaging?.operation?.code === "D15"} />{" "}
        D 15
      </div>
      <div> Date de réalisation : {formatDate(packaging?.operation?.date)}</div>
      <br />
      <div>
        Je soussigné (nom, prénom) : {packaging?.operation?.signature?.author}
      </div>
      <div>
        Certifie que les mentions dans les cadres 9 et 10 sont exactes et que
        l'opération indiquée ci-dessus a été réalisée.
      </div>
      <div>Signature :</div>
      {packaging?.operation?.signature?.date && <SignatureStamp />}
    </div>
  );
}

function BsffOnePackagingOperationNextDestination({
  packaging
}: {
  packaging: BsffPackaging;
}) {
  return (
    <div className="BoxRow">
      <div className="BoxCol">
        <p>
          <strong>10. Installation de destination prévue</strong>
        </p>
        <div className="Row">
          <div className="Col">
            <FormCompanyFields
              company={packaging?.operation?.nextDestination?.company}
            />
          </div>
          <div className="Col">
            Code D/R prévu :{" "}
            {packaging?.operation?.nextDestination?.plannedOperationCode}
          </div>
        </div>
      </div>
    </div>
  );
}

function BsffPackagingOperation({ packaging }: { packaging: BsffPackaging }) {
  return (
    <div>
      <div>Nom du responsable : {packaging?.operation?.signature?.author}</div>
      <div>
        Code D/R : {packaging?.operation?.code} (
        {packaging?.operation?.description})
      </div>
      {packaging?.operation?.noTraceability && (
        <div>Rupture de traçabilité autorisée par arrêté préfectoral</div>
      )}
      <div>Date de réalisation : {formatDate(packaging?.operation?.date)}</div>
      {packaging?.operation?.nextDestination?.company?.siret && (
        <>
          <div>
            Destination ultérieure prévue :{" "}
            {packaging?.operation?.nextDestination?.company?.name}{" "}
            {packaging?.operation?.nextDestination?.company?.siret}
          </div>
          <div>
            Code D/R prévu :{" "}
            {packaging?.operation?.nextDestination?.plannedOperationCode}
          </div>
        </>
      )}
    </div>
  );
}

function BsffPackagingAcceptationOperation({ bsff }: Pick<Props, "bsff">) {
  return (
    <div className="BoxRow">
      <div className="BoxCol">
        <p>
          <strong>8. Acceptation et opération par contenant</strong>
        </p>
        <table>
          <thead>
            <tr>
              <th>Contenant</th>
              <th>Acceptation</th>
              <th>Opération</th>
            </tr>
          </thead>
          <tbody>
            <></>
            {[...bsff.packagings].reverse().map(packaging => (
              <tr key={packaging.id}>
                <td>
                  <BsffPackagingFull packaging={packaging} />
                </td>
                <td>
                  {packaging?.acceptation?.signature?.date && (
                    <div className="Flex SpaceBetween">
                      <BsffPackagingAcceptation
                        bsff={bsff}
                        packaging={packaging}
                      />
                      <SignatureStampSmall />
                    </div>
                  )}
                </td>
                <td>
                  {packaging?.operation?.signature?.date && (
                    <div className="Flex SpaceBetween">
                      <BsffPackagingOperation packaging={packaging} />
                      <SignatureStampSmall />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BsffFicheInterventions({
  ficheInterventions
}: {
  ficheInterventions: BsffFicheIntervention[];
}) {
  return (
    <div className="mb-30">
      <h4 className="TextUnderline">
        Cas lié à la collecte de petites quantités
      </h4>
      <table className="mb-3">
        <thead>
          <tr>
            <th colSpan={3}>
              Fiches d'interventions liées au bordereau de collecte de petites
              quantités
            </th>
          </tr>
          <tr>
            <th>Numéro fiche d'intervention</th>
            <th>Quantité de fluide en kg</th>
            <th>Code postal lieu de collecte</th>
          </tr>
        </thead>
        <tbody>
          {ficheInterventions.map(FI => (
            <tr key={FI.id}>
              <td>{FI.numero}</td>
              <td>{FI.weight}</td>
              <td>{FI.postalCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <div className="TextAlignCenter mb-3">
          <strong>Ou</strong>
        </div>
        <div>
          <input type="checkbox" /> Déclaration d'exemption de fiche
          d'intervention pour certaines activités relevant R. 543-82 de code de
          l'environnement.
        </div>
      </div>
    </div>
  );
}

function PreviousBsffsTable({ bsff }: Pick<Props, "bsff">) {
  return (
    <div>
      <h4 className="TextUnderline">Cas lié au mouvement de contenant(s)</h4>
      <table className="mb-3">
        <thead>
          <tr>
            <th colSpan={5}>
              Bordereau(x) associé(s) constituant l'historique de traçabilité
            </th>
          </tr>
          <tr>
            <th>Numéro bordereau</th>
            <th>CAP</th>
            <th>Quantité fluide en kg</th>
            <th>N° contenant(s)</th>
            <th>Code postal</th>
          </tr>
        </thead>
        <tbody>
          {bsff.previousBsffs.map(previous => (
            <tr key={previous.id}>
              <td>{previous.id}</td>
              <td>{previous.destination?.cap}</td>
              <td>{previous.weight?.value}</td>
              <td>
                {previous.packagings
                  .map(p => p.numero)
                  .filter(numero =>
                    bsff.packagings.map(p => p.numero).includes(numero)
                  )
                  .join(" ")}
              </td>
              <td>{extractPostalCode(previous.emitter?.company?.address)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
