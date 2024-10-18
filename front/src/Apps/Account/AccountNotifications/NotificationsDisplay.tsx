import { CompanyPrivate, UserNotifications } from "@td/codegen-ui";
import React from "react";

type AccountCompanyNotificationsProps = {
  company: CompanyPrivate;
};

function getNotificationLabels(notifications: UserNotifications) {
  const labels = [
    {
      value: "Rattachement",
      isActive: notifications.membershipRequest
    },
    { value: "Code signature", isActive: notifications.signatureCodeRenewal },
    { value: "Refus", isActive: notifications.bsdRefusal },
    {
      value: "Destination finale amiante",
      isActive: notifications.bsdaFinalDestinationUpdate
    },
    { value: "Revision", isActive: notifications.revisionRequest }
  ];
  return labels
    .filter(l => l.isActive)
    .map(l => l.value)
    .join(", ");
}

export function NotificationsDisplay({
  company
}: AccountCompanyNotificationsProps) {
  if (
    Object.keys(company.userNotifications).some(
      notification => company.userNotifications[notification] === true
    )
  ) {
    return <div>{getNotificationLabels(company.userNotifications)}</div>;
  }

  return <div>Désactivé</div>;
}
