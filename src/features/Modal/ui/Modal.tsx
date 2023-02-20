import React, { HTMLAttributes, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

type ModalProps = HTMLAttributes<HTMLDivElement> & {
  visible?: boolean;
  children: React.ReactNode;
  title: string;
  showCloseButton?: boolean;
  onClose?: <T>(e: T) => void;
};

export const Modal = ({
  visible = true,
  title,
  children,
  showCloseButton = true,
  onClose,
}: ModalProps) => {
  useEffect(() => {
    function close(this: Document, e: KeyboardEvent) {
      if (e.key === 'Escape' && onClose) {
        onClose(e);
      }
    }
    document.addEventListener('keydown', close, false);
    return () => {
      document.removeEventListener('keydown', close);
    };
  }, []);

  return visible ? (
    <Back>
      <Window>
        <Header>
          <h3>{title}</h3>
          {showCloseButton && (
            <CloseButton
              onKeyDown={(e) => {
                if (e.key === 'Enter' && onClose) onClose(e);
              }}
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faXmark} />
            </CloseButton>
          )}
        </Header>
        <Content>{children}</Content>
      </Window>
    </Back>
  ) : null;
};

const Back = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;
const Window = styled.div`
  display: flex;
  width: 100%;
  max-width: 500px;
  flex-direction: column;
  background: var(--bg-color);
  border: 1px solid #1a1a1a;
  color: var(--color);
  border-radius: 20px;
  max-height: calc(100vh - 4rem);
`;
const Header = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #1a1a1a;
`;
const CloseButton = styled.button`
  cursor: pointer;
  border: none;
  line-height: 0rem;
  background: transparent;
  font-size: 22px;
  color: #1a1a1a;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  padding: 20px 20px;
  overflow-y: auto;
`;
