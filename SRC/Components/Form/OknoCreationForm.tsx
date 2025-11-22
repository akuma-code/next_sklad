'use client'

import { Box, Button, IconButton, InputAdornment, Paper, Stack, TextField } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { UploadResponse } from '../../../app/api/upload/route'
import UploadButton from '../Buttons/UploadButton'
import { uploadImg } from '@/Helpers/uploadImg'
import { _ID } from '@/Helpers/generateId'
import { createSkladItem } from '@/Services/skladService'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
const OknoCreationForm = ({ onClose }: { onClose: () => void }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [amount, setAmount] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [info, setInfo] = useState<{ text: string, id: string }[]>([]);

    const onFinish = async () => {


        const { filename } = await uploadImg(file)
        await createSkladItem(title, +amount, filename, desc, info)
        onClose()

    }
    const { mutateAsync } = useMutation({
        mutationKey: ['create_sklad'],
        mutationFn: onFinish
    })
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            // console.log(e.target.files)
            setFile(e.target.files[0]);
        }
    }
    const handleChangeInfo = (id: string, text: string) => {
        setInfo(prev => prev.map(p => p.id === id ? { ...p, text: text } : p))
    }

    const handleRemoveInfo = (id: string) => {
        setInfo(prev => prev.filter(p => p.id !== id))
    }

    return (
        <Paper>
            <form action={ () => mutateAsync() }>

                <Box
                    component={ Stack }
                    maxWidth={ 400 }
                    p={ 3 }
                    spacing={ 2 }
                >

                    <TextField
                        label={ 'Название' }
                        variant='outlined'
                        color='primary'
                        value={ title }
                        onChange={ (e) => setTitle(e.target.value) }
                    />
                    <TextField
                        label={ 'Описание' }
                        variant='outlined'
                        color='primary'
                        value={ desc }
                        onChange={ (e) => setDesc(e.target.value) }
                    />
                    <TextField
                        label={ 'Количество' }
                        variant='outlined'
                        color='primary'
                        value={ amount }
                        onChange={ (e) => setAmount(e.target.value) }
                    />
                    <Button onClick={ () => setInfo(prev => ([...prev, { text: "", id: _ID() }])) }>Add Info</Button>
                    { info.map(i =>
                        <TextField
                            key={ i.id }
                            value={ i.text }
                            onChange={ (e) => handleChangeInfo(i.id, e.target.value) }
                            slotProps={ {
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end" >
                                            <IconButton onClick={ () => handleRemoveInfo(i.id) } >
                                                <CloseRoundedIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            } }
                        />
                    ) }

                    <UploadButton
                        title="Добавить изображение"
                        onChange={ handleFileChange }
                    />
                    <Button type='submit'>Подтвердить</Button>
                    <Button type='reset' onClick={ onClose }>Отмена</Button>
                </Box>
            </form>
        </Paper>
    )
}




export default OknoCreationForm
