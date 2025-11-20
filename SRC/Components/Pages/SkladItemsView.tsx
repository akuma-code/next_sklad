'use client'

import { getAllSkladAndInfo } from '@/Services/skladService'
import { Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import SkladItemCard from '../Cards/SkladItemCard'


const SkladItemsView = () => {

    const { data, isSuccess } = useQuery({
        queryKey: ['sklad_items'],
        queryFn: async () => getAllSkladAndInfo()
    })
    return (
        <Stack direction={ 'row' } maxHeight={ '70vh' } spacing={ 2 } p={ 2 }>
            { isSuccess && data.map(item =>
                <SkladItemCard
                    key={ item.id }
                    { ...item }

                />
            ) }

        </Stack>
    )
}

export default SkladItemsView
