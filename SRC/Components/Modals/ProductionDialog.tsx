'use client'

import { Dialog, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useState } from 'react'

const ProductionDialog = (props: { open: boolean, onClose: () => void }) => {
    const { open, onClose } = props;
    const [amount, setAmount] = useState(1);

    return (
        <Dialog open={ open } onClose={ onClose }>
            <DialogTitle title='Production' >Production</DialogTitle>
            <DialogContent>
                <TextField value={ amount } onChange={ (e) => setAmount(+e.target.value) } />

            </DialogContent>
        </Dialog>
    )
}

export default ProductionDialog
