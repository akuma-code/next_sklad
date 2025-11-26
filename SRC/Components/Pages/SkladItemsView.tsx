'use client'

import { getAllSkladAndInfo } from '@/Services/skladService'
import { Stack } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import SkladItemCard from '../Cards/SkladItemCard'
import SkladItemCard_Small from '../Cards/SItem_CardSmall'
import { checkFinishedProductions } from '@/Services/productionService'
import { useEffect } from 'react'


const SkladItemsView = () => {

    const { data, isSuccess } = useQuery({
        queryKey: ['sklad_items'],
        queryFn: () => getAllSkladAndInfo(),
        select: (data) => data.sort((a, b) => a.id - b.id)
    })

    const { mutate } = useMutation({
        mutationFn: checkFinishedProductions
    });


    useEffect(() => {
        mutate()
    }, []);
    return (
        <Stack
            direction={ 'row' }
            maxHeight={ '90vh' }
            p={ 2 }
            flexWrap={ 'wrap' }
            rowGap={ 1 }
            columnGap={ 2 }
            overflow={ 'scroll' }>
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
