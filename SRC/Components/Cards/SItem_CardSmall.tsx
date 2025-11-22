'use client'

import { Prisma } from '@/generated/prisma/client'
import { Badge, Box, Card, CardContent, CardHeader, Dialog, DialogContent, DialogTitle, Fab, LinearProgress, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useMemo } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useMutation } from '@tanstack/react-query';
import { deleteInfo } from '@/Services/skladService';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useToggle } from '@/HOOKS/useToggle';
import dayjs from 'dayjs';
import { _dbDateParser } from '@/Helpers/dayjs';
type ItemCardSmallProps = { item: Prisma.SkladGetPayload<{ include: { info: true, production: true } }> }

const SkladItemCard_Small = ({ item }: ItemCardSmallProps) => {

    const { amount, desc, id, img, info = [], production = [], title } = item;
    const { mutate: deleteInfoItem } = useMutation({
        mutationFn: (id: string) => deleteInfo(id)
    });
    const [open, ctrl] = useToggle();

    const current_amount = useMemo(() => {
        const total_prod = production.reduce((prev, current) => {
            const sum = prev + current.amount
            return sum
        }, 0)
        return amount - total_prod
    }, [amount, production])

    const prod_info = useMemo(() => {
        const get_rest_days = (date: string) => dayjs(date).diff(dayjs(), 'day')
        const prod = production.map(p => ({ amount: p.amount, rest: get_rest_days(p.endsAt), id: p.id, endsAt: p.endsAt }))
        return prod
    }, [production])
    return (

        <Card sx={ { position: 'relative' } }>
            <CardHeader
                title={ title }
                subheader={ desc }
            />
            <Fab sx={ {
                right: 0,
                position: 'absolute',
                top: 0
            } }
                onClick={ ctrl.on }
            >
                <ErrorOutlineIcon fontSize={ 'large' } />
            </Fab>

            <CardContent>
                <Image
                    alt='noImage'
                    src={ '/uploads/' + img }
                    width={ 200 }
                    height={ 200 }
                />

                { prod_info.map(p =>

                    <Box sx={ { display: 'flex', alignItems: 'center' } } key={ p.id }>
                        <Box flexGrow={ 1 }>
                            <Typography>
                                { _dbDateParser(p.endsAt).dd_mmmm }
                            </Typography>
                        </Box>
                        <Box sx={ { width: '30%', mx: 1 } }>
                            <LinearProgress variant="determinate" value={ 100 - p.rest * 10 } />
                        </Box>
                        <Box flexGrow={ 1 }>
                            <Typography>
                                { p.amount } шт.
                            </Typography>
                        </Box>
                    </Box>

                ) }
            </CardContent>
            <InfoDialog open={ open } onClose={ ctrl.off } title={ title }>
                {/* { prod_info.map(p =>

                    <Box sx={ { display: 'flex', alignItems: 'center' } } key={ p.id }>
                        <Box flexGrow={ 1 }>
                            <Typography>
                                { _dbDateParser(p.endsAt).dd_mmmm }
                            </Typography>
                        </Box>
                        <Box sx={ { width: '50%', mx: 1 } }>
                            <LinearProgress variant="determinate" value={ 100 - p.rest * 10 } />
                        </Box>
                        <Box flexGrow={ 1 }>
                            <Typography>
                                { p.amount } шт.
                            </Typography>
                        </Box>
                    </Box>

                ) } */}
                <List dense={ false } sx={ { maxWidth: 300 } } >

                    { info?.map(i =>
                        <ListItem key={ i.uuid } divider
                            secondaryAction={
                                <ListItemButton title='Удалить' sx={ { color: 'red' } }
                                    onClick={ () => deleteInfoItem(i.uuid) }
                                >
                                    <DeleteForeverIcon />
                                </ListItemButton>
                            }
                        >

                            <ListItemText
                                primary={ i.text }
                            />
                        </ListItem>
                    ) }
                </List>
            </InfoDialog>
        </Card>
    )
}


function InfoDialog({ open, onClose, children, title }: { open: boolean, onClose: () => void, children?: React.ReactNode, title: string }) {
    return (
        <Dialog open={ open } onClose={ onClose } >
            <DialogTitle>
                { title }
            </DialogTitle>
            <DialogContent sx={ { minWidth: 350 } }>
                { children }
            </DialogContent>
        </Dialog>
    )
}

export default SkladItemCard_Small
