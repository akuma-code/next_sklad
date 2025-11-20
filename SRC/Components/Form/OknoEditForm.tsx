'use client'

import { Prisma } from '@/generated/prisma/client'
import { _UUID } from '@/Helpers/generateId'
import { uploadImg } from '@/Helpers/uploadImg'
import { editSkladItem } from '@/Services/skladService'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Box, Button, IconButton, InputAdornment, Paper, Stack, TextField } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import UploadButton from '../Buttons/UploadButton'

interface EditSkladProps {
    sklad_item: Prisma.SkladGetPayload<{ include: { info: true, production: true } }>
    onClose: () => void
}
const OknoEditForm = (props: EditSkladProps) => {

    const { sklad_item, onClose } = props;

    const [title, setTitle] = useState(sklad_item.title);
    const [amount, setAmount] = useState(sklad_item.amount);
    const [file, setFile] = useState<File | null>(null);
    const [info, setInfo] = useState<{ text: string, uuid: string }[]>(sklad_item.info);
    const [img, setImg] = useState(sklad_item.img);
    const onFinish = async () => {


        if (file) {

            const { filename } = await uploadImg(file)
            setImg(() => filename)
            await editSkladItem(sklad_item.id, {
                amount, img: filename, title,
                info: { upsert: info.map(i => ({ where: { uuid: i.uuid }, create: { text: i.text }, update: { text: i.text } })) }
            })
            onClose()
            return
        } else
            await editSkladItem(sklad_item.id, {
                amount, title,
                info: { upsert: info.map(i => ({ where: { uuid: i.uuid }, create: { text: i.text }, update: { text: i.text } })) }

            })
        onClose()

    }
    const { mutateAsync } = useMutation({
        mutationKey: ['edit_sklad'],
        mutationFn: onFinish
    })
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            // console.log(e.target.files)
            setFile(e.target.files[0]);
        }
    }
    const handleChangeInfo = (id: string, text: string) => {
        setInfo(prev => prev.map(p => p.uuid === id ? { ...p, text: text } : p))
    }

    const handleRemoveInfo = (id: string) => {
        setInfo(prev => prev.filter(p => p.uuid !== id))
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
                        label={ 'Количество' }
                        variant='outlined'
                        color='primary'
                        value={ amount }
                        onChange={ (e) => setAmount(+e.target.value) }
                    />
                    <Button onClick={ () => setInfo(prev => ([...prev, { text: "", uuid: _UUID() }])) }>Add Info</Button>
                    { info.map(i =>
                        <TextField
                            key={ i.uuid }
                            value={ i.text }
                            onChange={ (e) => handleChangeInfo(i.uuid, e.target.value) }
                            slotProps={ {
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end" >
                                            <IconButton onClick={ () => handleRemoveInfo(i.uuid) } >
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




export default OknoEditForm
