import { css } from 'styled-components';

export const mobile = (inner: string) => css`
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    ${inner}
  }
`;

export const tablet = (inner: string) => css`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    ${inner}
  }
`;

export const desktop = (inner: string) => css`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    ${inner}
  }
`;

export const landscapeMobile = (inner: string) => css`
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) and (orientation: landscape) {
    ${inner}
  }
`;
