import { IconLookup } from '@fortawesome/fontawesome-common-types'
import { icon as getIconDefinition, IconParams } from '@fortawesome/fontawesome-svg-core'
import { SvgIcon, SvgIconProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'

export type BaseIconProps<P extends Record<string, unknown>> = SvgIconProps &
  P & { params?: IconParams };

export type OwnProps = {
  icon: IconLookup;
};

export type IconProps = BaseIconProps<OwnProps>;

export const StyledSvgIcon = styled(SvgIcon)`
  color: ${props => props.theme.palette.text.primary};
`

export const Icon: React.FC<IconProps> = ({ icon: iconLookup, params, ...props }) => {
  const def = getIconDefinition(iconLookup, params)

  if (!def) {
    return null
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [width, height, _ligature, _unicode, path] = def.icon

  return (
    <StyledSvgIcon {...props} viewBox={`0 0 ${width} ${height}`}>
      {
        // eslint-disable-next-line react/no-array-index-key
        Array.isArray(path) ? path.map((p, i) => <path key={i} d={p} />) : <path d={path} />
      }
    </StyledSvgIcon>
  )
}
