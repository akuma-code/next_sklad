'use client'
import { getAllSkladAndInfo, getOneSkladItem } from '@/Services/skladService';
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, ListItemText, Skeleton, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import SkladItemCard from '../Cards/SkladItemCard';
import { getSkladItemProductions } from '@/Services/productionService';
import { _dbDateParser } from '@/Helpers/dayjs';

const OneSkladItemView = () => {

    const [skladId, setSkladId] = useState<number | undefined>(undefined);

    const { data, isSuccess } = useQuery({
        queryKey: ['skladItem'],
        queryFn: () => getAllSkladAndInfo(),
        select: (data) => data.sort((a, b) => a.id - b.id).map(d => ({ id: d.id, title: d.title }))

    });
    const { data: skladItem, isLoading } = useQuery({
        queryKey: ['sklad_item', skladId],
        queryFn: () => getOneSkladItem(Number(skladId)),
        enabled: !!skladId
    })
    const { data: productions, isLoading: isLoadingProduction } = useQuery({
        queryKey: ['production', skladId],
        queryFn: () => getSkladItemProductions(Number(skladId), true),
        enabled: !!skladId
    });

    return (
        <Stack direction={ 'row' } spacing={ 2 } p={ 2 }>
            <ButtonGroup orientation='vertical'>

                { isSuccess && data.map(d =>
                    <Button
                        key={ d.id }
                        onClick={ () => setSkladId(d.id) }
                        variant={ d.id === skladId ? "contained" : "outlined" }
                    >
                        { d.title }
                    </Button>
                ) }
            </ButtonGroup>

            {
                isLoading ?
                    <Box sx={ { pt: 0.5, width: 400, border: '1px solid' } }>
                        <Skeleton />
                        <Skeleton width="60%" />
                        <Skeleton width="100%" height={ 200 } />
                        <Skeleton width="100%" height={ 200 } variant='rectangular' />
                    </Box>
                    : skladItem && <SkladItemCard { ...skladItem } />
            }
            { productions && productions.length > 0 &&
                <Card
                    sx={ { border: '1px solid black', overflow: 'auto' } }
                >
                    <CardHeader title="История заказов" />
                    <CardContent>
                        {
                            productions?.map(p =>
                                <ListItemText key={ p.id }
                                    primary={ `Заказано: ${p.amount} шт` }
                                    secondary={ `Завершено: ${_dbDateParser(p.endsAt).dd_mm_yyyy}` } />
                            )
                        }
                    </CardContent>
                </Card> }

        </Stack>
    )
}

export default OneSkladItemView
