'use client'

import { Prisma } from '@/generated/prisma/client'
import { Badge, Box, Button, Card, CardContent, CardHeader, Dialog, DialogContent, DialogTitle, Fab, IconButton, LinearProgress, List, ListItem, ListItemButton, ListItemText, Stack, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useMemo, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useMutation } from '@tanstack/react-query';
import { createSkladInfo, deleteInfo } from '@/Services/skladService';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useToggle } from '@/HOOKS/useToggle';
import dayjs from 'dayjs';
import { _dbDateParser } from '@/Helpers/dayjs';
import { _UUID } from '@/Helpers/generateId';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
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

        <Card sx={ {
            position: 'relative',
            border: '1px solid black',
            minHeight: 350,
            minWidth: 220

        } }>
            <CardHeader
                title={ title }
                subheader={ desc }
            />
            <Fab sx={ {
                right: 5,
                position: 'absolute',
                top: 5
            } }
                size='small'
                onClick={ ctrl.on }
            >
                { info.length > 0
                    ?
                    <ErrorOutlineIcon fontSize={ 'large' } color='warning' />
                    : <AddIcon fontSize='large' />
                }
            </Fab>

            <CardContent>
                <Typography fontWeight={ 'bold' } textAlign={ 'center' }>Остаток: { current_amount }</Typography>
                <Image
                    alt='noImage'
                    src={ '/uploads/' + img }
                    width={ 220 }
                    height={ 280 }
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
            <InfoDialog open={ open } onClose={ ctrl.off } title={ title } skladId={ id }>

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


interface InfoDialogProps {
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    title: string;
    skladId: number
}

function InfoDialog({ open, onClose, children, title, skladId }: InfoDialogProps) {

    const [infos, setInfos] = useState<{ text: string, uuid: string }[]>([]);
    const handleAdd = () => {
        const new_info = { text: "", uuid: _UUID() }
        setInfos(prev => [...prev, new_info])
    }
    const { mutate: create } = useMutation({
        mutationFn: (text: string) => createSkladInfo(skladId, text)
    });
    const handleCreate = (uuid: string) => {
        const info = infos.find(i => i.uuid === uuid)
        if (info) {
            create(info.text)
            setInfos(prev => prev.filter(p => p.uuid !== uuid))
        }
    }
    return (
        <Dialog open={ open } onClose={ onClose } >
            <DialogTitle>
                { title }
            </DialogTitle>

            <DialogContent sx={ { minWidth: 350 } }>
                <Button onClick={ handleAdd }
                    variant='outlined'
                    color='success'
                    size='small'
                    fullWidth

                >
                    Добавить заметку
                </Button>
                <Stack>
                    { infos.map(i =>
                        <Box
                            key={ i.uuid }
                            sx={ { display: 'flex' } }
                        >
                            <TextField
                                size='small'
                                margin='dense'

                                value={ i.text }
                                onChange={ (e) => setInfos(prev => prev.map(p => p.uuid === i.uuid ? ({ ...p, text: e.target.value }) : p)) }
                            />
                            <IconButton size='large'
                                onClick={ () => handleCreate(i.uuid) }
                            >
                                <AddIcon />
                            </IconButton>

                            <IconButton size='large'
                                onClick={ () => setInfos(prev => prev.filter(p => p.uuid !== i.uuid)) }
                            >
                                <RemoveIcon />
                            </IconButton>
                        </Box>
                    ) }
                </Stack>
                { children }
            </DialogContent>
        </Dialog>
    )
}

export default SkladItemCard_Small
