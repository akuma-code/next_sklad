'use client'

import { _formated_date } from '@/Helpers/dayjs';
import { StartProduction } from '@/Services/productionService';
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
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
            <DialogTitle >Запуск в производство</DialogTitle>
            <DialogContent>
                <Stack direction={ 'row' }
                    gap={ 4 }
                >

                    <TextField
                        label="Количество"

                        margin='dense'
                        sx={ { maxWidth: 90, textAlign: 'center' } }

                        value={ amount }
                        onChange={ (e) => setAmount(+e.target.value) } />

                    <DatePicker
                        slotProps={ {
                            textField: {

                                margin: 'dense'
                            }
                        } }
                        value={ date }
                        onChange={ (v) => setDate(v) } />
                </Stack>

            </DialogContent>
            <DialogActions>
                <ButtonGroup variant='contained'>

                    <Button onClick={ handleStart }>Запустить</Button>
                    <Button onClick={ onClose } color='warning'>Отмена</Button>
                </ButtonGroup>
            </DialogActions>
        </Dialog>
    )
}

export default ProductionDialog
