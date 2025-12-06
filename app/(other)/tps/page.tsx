import CanvasTPS from '@/Components/Tps/CanvasTPS'
import { Box } from '@mui/material'
import React from 'react'

const Tps = () => {
    return (
        <div>
            Техпомощь стайл калькулятор
            <Box
                width={ 600 }
                height={ 600 }
                border={ '1px solid black' }
                borderRadius={ '1rem' }
                p={ 2 }
                m={ 2 }
            >
                <CanvasTPS />
            </Box>
        </div>
    )
}

export default Tps
