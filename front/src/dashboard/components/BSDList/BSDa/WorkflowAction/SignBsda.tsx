import { gql } from "@apollo/client";
import { ActionButton } from "common/components";
import { IconCheckCircle1 } from "Apps/common/Components/Icons/Icons";
import React, { useState } from "react";
import { SignBsdaModal } from "./SignBsdaModal";

export const SIGN_BSDA = gql`
  mutation SignBsda($id: ID!, $input: BsdaSignatureInput!) {
    signBsda(id: $id, input: $input) {
      id
      status
    }
  }
`;

type Props = {
  title: string;
  bsdaId: string;
  children: (props: { bsda; onClose }) => React.ReactNode;
};

export function SignBsda({ title, bsdaId, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <ActionButton icon={<IconCheckCircle1 size="24px" />} onClick={onOpen}>
        {title}
      </ActionButton>
      {isOpen && (
        <SignBsdaModal title={title} bsdaId={bsdaId} onClose={onClose}>
          {children}
        </SignBsdaModal>
      )}
    </>
  );
}
