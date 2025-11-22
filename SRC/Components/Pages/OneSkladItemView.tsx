'use client'
import { getAllSkladAndInfo, getOneSkladItem } from '@/Services/skladService';
import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import SkladItemCard from '../Cards/SkladItemCard';

const OneSkladItemView = () => {


    const { data, isSuccess } = useQuery({
        queryKey: ['skladItem'],
        queryFn: () => getAllSkladAndInfo(),
        select: (data) => data.map(d => ({ id: d.id, title: d.title }))

    });
    const [skladId, setSkladId] = useState<number | undefined>(undefined);
    const { data: skladItem, isPending } = useQuery({
        queryKey: ['sklad_item', skladId],
        queryFn: () => getOneSkladItem(Number(skladId)),
        enabled: !!skladId
    })

    return (
        <Stack direction={ 'row' } spacing={ 2 } p={ 2 }>
            <ButtonGroup orientation='vertical'>

                { isSuccess && data.map(d =>
                    <Button
                        key={ d.id }
                        onClick={ () => setSkladId(d.id) }
                    >
                        { d.title }
                    </Button>
                ) }
            </ButtonGroup>

            { skladItem &&
                (isPending ? <Box>Loading</Box> : <SkladItemCard { ...skladItem } />)
            }
        </Stack>
    )
}

export default OneSkladItemView
