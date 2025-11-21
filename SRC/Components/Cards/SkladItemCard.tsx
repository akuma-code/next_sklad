'use client'

import { useToggle } from '@/HOOKS/useToggle'
import { deleteSkaldItem } from '@/Services/skladService'
import { Avatar, Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import EditSkladDialog from '../Modals/EditSkladDialog'
import ProductionDialog from '../Modals/ProductionDialog'
import Image from 'next/image'
import { _dbDateParser } from '@/Helpers/dayjs'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { finishProductionTask } from '@/Services/productionService'
import { useMemo } from 'react'
interface SkladItemCardProps {
    id: number
    title: string
    img?: string | null

    amount: number
    info?: { text: string, uuid: string }[]
    production?: {
        id: number;
        endsAt: string;
        isReady: boolean;
        skladId: number;
        amount: number
    }[];
}

const SkladItemCard = (props: SkladItemCardProps) => {

    const { amount, img = "no image", title, info = [], id, production = [] } = props;
    const [show_edit, edit_control] = useToggle()
    const [show_prod, prod_control] = useToggle()

    const { mutate: remove } = useMutation({
        mutationFn: (id: number) => deleteSkaldItem(id)
    })

    const { mutate: finishTask } = useMutation({
        mutationFn: (id: number) => finishProductionTask(id)
    });
    const current_amount = useMemo(() => {
        const total_prod = production.reduce((prev, current) => {
            const sum = prev + current.amount
            return sum
        }, 0)
        return amount - total_prod
    }, [amount, production])
    const isProd = production.length > 0

    return (
        <Card sx={ { border: '1px solid black', maxWidth: 400 } }>
            <CardHeader title={ title }
                subheader={ `остаток: ${current_amount} шт` }
            />
            <CardContent component={ Stack } alignItems={ 'center' }>
                <CardActions>
                    <ButtonGroup variant='contained' orientation='horizontal'>

                        <Button onClick={ edit_control.toggle }>Редактировать</Button>
                        <Button color='secondary' onClick={ prod_control.toggle }>Запустить</Button>
                        <Button color='warning' onClick={ () => remove(id) }>Удалить</Button>
                    </ButtonGroup>
                </CardActions>
                <Image
                    src={ '/uploads/' + img }
                    alt='no image'
                    width={ 250 }
                    height={ 300 }
                />
                <List dense={ false } sx={ { minWidth: 350 } } >

                    { info?.map(i =>
                        <ListItem key={ i.uuid } divider
                            secondaryAction={
                                <ListItemButton title='Удалить' sx={ { color: 'red' } }>
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
                { isProd &&
                    <Box
                        p={ 1 }
                        bgcolor={ 'lightgreen' }
                        border={ '1px solid black' }>

                        <Divider
                            flexItem
                            orientation='horizontal'
                            sx={ { bgcolor: 'lightgrey' } }

                        >
                            <Stack
                                justifyContent={ 'space-between' }
                                direction={ 'row' }
                                spacing={ 8 }
                            >

                                <div>Кол-во </div>
                                <div>Готовность</div>
                                <div>Завершить</div>
                            </Stack>
                        </Divider>
                        <List dense={ true } sx={ { minWidth: 350 } }>

                            { production.map(p =>
                                <ListItem key={ p.id }
                                    divider
                                    dense={ true }
                                    secondaryAction={
                                        <ListItemButton
                                            onClick={ () => finishTask(p.id) }
                                            title='Завершить'
                                            sx={ { color: 'red' } }>
                                            <CheckCircleOutlineIcon />
                                        </ListItemButton>
                                    }>
                                    <ListItemAvatar

                                        sx={ {} }
                                    >
                                        <Avatar variant='circular' sx={ { bgcolor: 'darkcyan' } }>

                                            { p.amount }
                                        </Avatar>

                                    </ListItemAvatar>
                                    <ListItemText
                                        slotProps={ {
                                            primary: {
                                                fontSize: 16,
                                                textAlign: 'center'
                                            }
                                        } }
                                        primary={ ` ${_dbDateParser(p.endsAt).dd_mmmm}` }
                                    // secondary={ `будет готово: ${_dbDateParser(p.endsAt).dd_mmmm}` }
                                    />

                                </ListItem>
                            ) }
                        </List>
                    </Box>
                }





            </CardContent>
            <EditSkladDialog
                sklad_item={ { amount, id, img, info, production, title } }
                open={ show_edit }
                onClose={ edit_control.off }
            />
            <ProductionDialog open={ show_prod } onClose={ prod_control.off } skladId={ id } />
        </Card>
    )
}

export default SkladItemCard
