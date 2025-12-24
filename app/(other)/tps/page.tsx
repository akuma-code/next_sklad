import CanvasTPS from '@/Components/Tps/CanvasTPS'
import TpsControl from '@/Components/Tps/TpsControl'
import { seedProfileDelta } from '@/Services/profileService'
import { Box } from '@mui/material'
import React from 'react'

const Tps = async () => {

    // await seedProfileDelta()
    return (
        <div className='p-1'>

            <Box
                // width={ 600 }
                // height={ 600 }
                border={ '1px solid black' }
                borderRadius={ '1rem' }
                p={ 2 }
                m={ 2 }
            >
                <TpsControl />
            </Box>
        </div>
    )
}

export default Tps
