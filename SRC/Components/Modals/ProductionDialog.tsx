'use client'

import { _formated_date } from '@/Helpers/dayjs';
import { StartProduction } from '@/Services/productionService';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers';
import { useMutation } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react'

const ProductionDialog = (props: { open: boolean, onClose: () => void, skladId: number }) => {
    const { open, onClose, skladId } = props;
    const [amount, setAmount] = useState(1);
    const [date, setDate] = useState<Dayjs | null>(dayjs().add(8, 'day'));
    const { mutate } = useMutation({
        mutationFn: (payload: { id: number, end_date: string, amount: number }) => StartProduction(payload.id, payload.end_date, payload.amount)
    })

    const handleStart = () => {
        mutate({ amount, end_date: _formated_date(date), id: skladId })
        onClose()
    }
    return (
        <Dialog open={ open } onClose={ onClose }>
            <DialogTitle title='Production' >Production</DialogTitle>
            <DialogContent>
                <TextField value={ amount } onChange={ (e) => setAmount(+e.target.value) } />
                <DatePicker value={ date } onChange={ (v) => setDate(v) } />

            </DialogContent>
            <DialogActions>
                <Button onClick={ handleStart }>Start</Button>
                <Button onClick={ onClose }>Dismiss</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ProductionDialog
