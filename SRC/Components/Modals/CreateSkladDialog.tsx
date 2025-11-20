'use client'

import { Dialog, DialogContent } from '@mui/material'
import React from 'react'
import OknoCreationForm from '../Form/OknoCreationForm'
interface SkladDialogProps {
    open: boolean,
    onClose: () => void

}
const CreateSkladDialog = ({ open, onClose }: SkladDialogProps) => {
    return (
        <Dialog open={ open } onClose={ onClose }>
            <DialogContent>
                <OknoCreationForm onClose={ onClose } />
            </DialogContent>
        </Dialog>
    )
}

export default CreateSkladDialog
