'use client'

import { Dialog, DialogContent } from '@mui/material'
import React from 'react'
import OknoCreationForm from '../Form/OknoCreationForm'
import OknoEditForm from '../Form/OknoEditForm'
import { Prisma } from '@/generated/prisma/client'
interface SkladDialogProps {
    open: boolean,
    onClose: () => void,
    sklad_item: Prisma.SkladGetPayload<{ include: { info: true, production: true } }>

}
const EditSkladDialog = ({ open, onClose, sklad_item }: SkladDialogProps) => {
    return (
        <Dialog open={ open } onClose={ onClose }>
            <DialogContent>
                <OknoEditForm sklad_item={ sklad_item } onClose={ onClose } />
            </DialogContent>
        </Dialog>
    )
}

export default EditSkladDialog
