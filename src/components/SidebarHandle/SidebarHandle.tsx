import { ButtonBase, styled } from '@mui/material';
import React, { ComponentProps } from 'react';

export type SidebarHandleProps = ComponentProps<typeof ButtonBase> & {
  location?: 'left' | 'right'
  onSidebarOpen: () => void
  onSidebarClose?: () => void
}

export const SidebarHandle: React.FC<SidebarHandleProps> = ({ onSidebarOpen, onSidebarClose, location = 'right', ...props }) => {
  return (
    <StyledSidebarHandle onClick={onSidebarOpen} $location={location} {...props}>
      <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.247 7.11115C14.0153 4.34702 12.7452 1.4989 9.97728 0.474058C8.92084 0.102955 7.79898 -0.0529581 6.67965 0.0158266C5.56032 0.0846113 4.46669 0.376815 3.46516 0.874385C2.40544 1.45824 1.5247 2.31235 0.915073 3.34736C0.305445 4.38237 -0.0106132 5.55999 0.000271961 6.75681C0.0415287 8.00777 0.395887 9.22932 1.03181 10.3126C1.2671 10.7155 1.53184 11.101 1.82383 11.4661C2.96436 12.6548 4.44321 13.4751 6.06575 13.819C7.68829 14.1629 9.3786 14.0144 10.9138 13.3929C11.4346 13.0769 11.9131 12.6979 12.3384 12.2646C13.613 10.8468 14.295 9.00519 14.247 7.11115Z" fill="#29BBEA" />
      </svg>
    </StyledSidebarHandle>
  )
}

export const StyledSidebarHandle = styled(ButtonBase, { shouldForwardProp: (prop) => prop !== '$location' }) <{ $location: 'left' | 'right' }>`
  position: fixed;
  bottom: ${props => props.theme.typography.pxToRem(150)};
  ${props => props.$location === 'left' ? 'left: 0' : 'right: 0'};
  z-index: 99999999;
  border-radius: ${props => props.$location === 'left' ? `0 ${props.theme.typography.pxToRem(24)} ${props.theme.typography.pxToRem(24)} 0` : `${props.theme.typography.pxToRem(24)} 0 0 ${props.theme.typography.pxToRem(24)}`} ;
  background-color: ${props => props.theme.palette.custom.darkBlue};
  padding: ${props => props.theme.typography.pxToRem(14)} ${props => props.theme.typography.pxToRem(10)} ${props => props.theme.typography.pxToRem(14)} ${props => props.theme.typography.pxToRem(14)};

  &:after {
    content: '';
    position: absolute;
    left: ${props => props.theme.typography.pxToRem(16)};
    right: ${props => props.theme.typography.pxToRem(12)};
    bottom: ${props => props.theme.typography.pxToRem(16)};
    top: ${props => props.theme.typography.pxToRem(16)};
    background-color: ${props => props.theme.palette.primary.main};
    z-index: 2;
    border-radius: ${props => props.theme.typography.pxToRem(24)};
    transition: top 0.5s ease, bottom 0.45s ease, left 0.35s ease, right 0.4s ease, border-radius 0.35s ease;
  }

  &:hover:after {
    left: ${props => props.$location === 'right' ? '-1px' : 0};
    right: ${props => props.$location === 'left' ? '-1px' : 0};
    bottom: 0;
    top: 0;
    border-radius: ${props => props.$location === 'left' ? `0 ${props.theme.typography.pxToRem(24)} ${props.theme.typography.pxToRem(24)} 0` : `${props.theme.typography.pxToRem(24)} 0 0 ${props.theme.typography.pxToRem(24)}`} ;
  }
`
