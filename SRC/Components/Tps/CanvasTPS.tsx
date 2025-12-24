'use client'


import React from 'react'

const CanvasTPS = (props: { children?: React.ReactNode, svgProps?: React.SVGProps<SVGSVGElement>, style?: string }) => {
    const { children, svgProps, style = "" } = props



    return (
        <svg
            width="500"
            height="500"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth={ 1 }
            viewBox='0 0 500 500'
            className={ style }
            { ...svgProps }
        >
            <polygon
                points='0 0, 500 0, 500 500, 0 500'
                stroke='black'
                fill='transparent'

            // className='hover:fill-green-500'
            />

            { children }



        </svg>
    )
}



export default CanvasTPS
