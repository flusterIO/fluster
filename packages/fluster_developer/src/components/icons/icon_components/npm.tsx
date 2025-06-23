import React from 'react'
import { IoLogoNpm } from 'react-icons/io5';
import { IconProps } from '../types';



export const NPMIcon = (props: IconProps) => {
    return (
        <IoLogoNpm {...props} />
    )
}


NPMIcon.displayName = "NPMIcon"


export default NPMIcon
