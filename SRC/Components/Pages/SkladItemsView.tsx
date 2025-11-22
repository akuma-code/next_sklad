'use client'

import { getAllSkladAndInfo } from '@/Services/skladService'
import { Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import SkladItemCard from '../Cards/SkladItemCard'
import SkladItemCard_Small from '../Cards/SItem_CardSmall'


const SkladItemsView = () => {

    const { data, isSuccess } = useQuery({
        queryKey: ['sklad_items'],
        queryFn: () => getAllSkladAndInfo()
    })
    return (
        <Stack direction={ 'row' } maxHeight={ '90vh' } spacing={ 2 } p={ 2 }>
            { isSuccess && data.map(item =>
                <SkladItemCard_Small
                    key={ item.id }
                    item={ item }

                />
            ) }

        </Stack>
    )
}

export default SkladItemsView
