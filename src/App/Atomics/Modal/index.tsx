import { Color } from "constants/Color";
import { Size } from "constants/Size";
import React, { ReactNode, CSSProperties } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import "./styles.css";

ReactModal.setAppElement("#Modal");

const Layout = styled(ReactModal)`
  background-color: white;

  padding: 1rem;

  border-radius: ${Size.BORDER_RADIUS_PX};
  outline: none;
  box-shadow: 0 0 ${Size.BORDER_RADIUS_PX} 0 ${Color.MODAL_BORDER_COLOR};
`;

type Props = {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  isOpen: boolean;
  close?: () => void;
};

export const Modal = ({ className, style, children, isOpen, close }: Props) => {
  const isCloseable = !!close;

  return (
    <Layout
      overlayClassName="modal-overlay"
      className={className}
      style={{ content: style }}
      isOpen={isOpen}
      onRequestClose={close}
      shouldCloseOnEsc={isCloseable}
      shouldCloseOnOverlayClick={isCloseable}
      shouldFocusAfterRender={isCloseable}
      shouldReturnFocusAfterClose={isCloseable}
    >
      {children}
    </Layout>
  );
};
