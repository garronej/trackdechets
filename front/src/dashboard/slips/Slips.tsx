import React from "react";
import { Query } from "react-apollo";
import { GET_SLIPS } from "./query";
import { RouteComponentProps, withRouter } from "react-router";
import { DateTime } from "luxon";

export default withRouter(function Slips(props: RouteComponentProps) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Numéro de bordereau</th>
          <th>Date de création</th>
          <th>Emetteur</th>
          <th>Destinataire</th>
          <th>Code déchet</th>
          <th>Statut</th>
        </tr>
      </thead>
      <tbody>
        <Query query={GET_SLIPS}>
          {({ loading, error, data }) => {
            if (loading)
              return (
                <tr>
                  <td>Chargement...</td>
                </tr>
              );
            if (error)
              return (
                <tr>
                  <td>Erreur :(</td>
                </tr>
              );

            return data.forms.map((s: any) => (
              <tr
                key={s.id}
                onClick={() => props.history.push(`/form/steps/${s.id}`)}
              >
                <td>{s.id}</td>
                <td>{DateTime.fromISO(s.createdAt).toISODate()}</td>
                <td>{s.emitter.company.name}</td>
                <td>{s.recipient.company.name}</td>
                <td>{s.wasteDetails && s.wasteDetails.code}</td>
                <td>{s.status}</td>
              </tr>
            ));
          }}
        </Query>
      </tbody>
    </table>
  );
});
