import React from 'react'
import { IoLogoVercel } from 'react-icons/io5';
import { IconProps } from '../types';



export const VercelIcon = (props: IconProps) => {
    return (
        <IoLogoVercel {...props} />
    )
}


VercelIcon.displayName = "VercelIcon"


export default VercelIcon
