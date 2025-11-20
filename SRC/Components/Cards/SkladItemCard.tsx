'use client'

import { useToggle } from '@/HOOKS/useToggle'
import { deleteSkaldItem } from '@/Services/skladService'
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import EditSkladDialog from '../Modals/EditSkladDialog'
import ProductionDialog from '../Modals/ProductionDialog'

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
    }[];
}

const SkladItemCard = (props: SkladItemCardProps) => {

    const { amount, img = "no image", title, info = [], id, production = [] } = props;
    const [show_edit, edit_control] = useToggle()
    const [show_prod, prod_control] = useToggle()

    const { mutate: remove } = useMutation({
        mutationFn: (id: number) => deleteSkaldItem(id)
    })


    return (
        <Card sx={ { border: '1px solid black', maxWidth: 400, maxHeight: 600 } }>
            <CardHeader title={ title } />
            <CardContent>
                <Typography>
                    Количество: { amount } шт
                </Typography>
                <CardMedia
                    component={ 'img' }
                    sx={ { height: 250 } }
                    image={ '/uploads/' + img }
                    title={ title }
                />


                { info?.map(i =>
                    <Typography key={ i.uuid }>{ i.text }</Typography>
                ) }
                <CardActions>
                    <Button onClick={ edit_control.toggle }>Edit</Button>
                    <Button onClick={ () => remove(id) }>Delete</Button>
                    <Button onClick={ prod_control.toggle }>Add to ProductionQuery</Button>
                </CardActions>
            </CardContent>
            <EditSkladDialog
                sklad_item={ { amount, id, img, info, production, title } }
                open={ show_edit }
                onClose={ edit_control.off }
            />
            <ProductionDialog open={ show_prod } onClose={ prod_control.off } />
        </Card>
    )
}

export default SkladItemCard
