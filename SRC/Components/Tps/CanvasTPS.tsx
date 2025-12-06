'use client'


import React from 'react'

const CanvasTPS = () => {
    return (
        <svg
            width="400"
            height="400"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth={ 1 }
            viewBox='0 0 400 400'

        >
            <polygon
                points='0 0, 400 0, 400 400, 0 400'
                stroke='black'
                fill='transparent'

            // className='hover:fill-green-500'
            />
            {/* <polygon
                points='50 50, 100 100, 100 300, 50 350'
                stroke='black'
                fill='red'
                className='hover:fill-green-500'
            /> */}
            <polygon
                points='50 50, 100 100, 300 100, 350 50'
                stroke='black'
                fill='red'
                className='hover:fill-green-500'
            />
            <polygon
                points='350 50, 350 350, 300 300, 300 100'
                stroke='black'
                fill='red'
                className='hover:fill-green-500'
            />
            <polygon
                points='350 350, 50 350, 100 300, 300 300'
                stroke='black'
                fill='red'
                className='hover:fill-green-500'
            />
            <LeftImpost />
        </svg>
    )
}

const LeftImpost = () => {
    return (
        <>
            <polyline
                points='100 50, 50 50, 50 100, 100 100'
                fill='red'
                stroke='black'
            />
            <polygon points='50 100, 75 100, 75 300, 50 300' stroke='black' fill='red' />
            <polyline
                points='100 300, 50 300, 50 350, 100 350'
                fill='red'
                stroke='black'
            />
            {/* <line x1={ 50 } y1={ 100 } x2={ 100 } y2={ 100 }
                stroke='black'
            />
            <line x1={ 50 } y1={ 300 } x2={ 100 } y2={ 300 }
                stroke='black'
            />
            <line x1={ 75 } y1={ 100 } x2={ 75 } y2={ 300 }
                stroke='black'
            /> */}
        </>
    )
}

export default CanvasTPS
