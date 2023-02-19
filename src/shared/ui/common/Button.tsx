import styled from 'styled-components';
import React, { ButtonHTMLAttributes } from 'react';

type ButtonTypes = 'primary' | 'cancelling' | 'applying';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: ButtonTypes;
  fullWidth?: boolean;
}

export const Button = (
  props: ButtonProps,
  { styleType = 'primary', fullWidth = false }: ButtonProps
) => {
  const { children } = props;
  return (
    <StyledButton fullWidth={fullWidth} styleType={styleType} {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  styleType: ButtonTypes;
  fullWidth: boolean;
}>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  font-family: 'Rubik', sans-serif;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  background-color: ${({ styleType }) =>
      styleType === 'applying' ? '#27AE60'
      : styleType === 'cancelling'
      ? '#EB5757'
      : '#1e1e1e'};
  color: #fff;
  &:disabled {
    filter: grayscale(1) opacity(0.3);
  }
`;
