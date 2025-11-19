'use client'

import React, { useState } from 'react'
import UploadButton from '../Buttons/UploadButton'
import { Box, Button, Paper, Stack, TextField } from '@mui/material'
import { UploadResponse } from '../../../app/api/upload/route'
import { createNewOkno } from '@/Services/oknoService'
import { createSkladItem } from '@/Services/skladService'

const OknoCreationForm = () => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [file, setFile] = useState<File | null>(null);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files)
            setFile(e.target.files[0]);
        }
    }

    const onFinish = async () => {
        try {
            const fd = new FormData()
            fd.append('title', title)
            if (file) fd.append('file', file)

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: fd
            })

            const result = await response.json() as unknown as UploadResponse

            if (response.ok && file) {
                console.log(result)
                console.log(result.filename, " succesfuly uploaded")
                await createSkladItem(title, result.filename, +amount)
                setFile(null)
                setTitle("")
                setAmount("")
            }
        } catch (error) {
            console.error(error)
            throw new Error()
        }


    }
    return (
        <Paper>
            <form action={ onFinish }>

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
                        label={ 'Количество' }
                        variant='outlined'
                        color='primary'
                        value={ amount }
                        onChange={ (e) => setAmount(e.target.value) }
                    />


                    <UploadButton
                        title="Добавить изображение"
                        onChange={ handleFileChange }
                    />
                    <Button type='submit'>Подтвердить</Button>
                    <Button type='reset'>Отмена</Button>
                </Box>
            </form>
        </Paper>
    )
}

export default OknoCreationForm
