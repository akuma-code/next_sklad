'use client'

import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined'
import Grid3x3OutlinedIcon from '@mui/icons-material/Grid3x3Outlined'
import Grid4x4OutlinedIcon from '@mui/icons-material/Grid4x4Outlined'
import { Avatar, Box, Button, ButtonGroup, FormControl, ListItem, ListItemAvatar, ListItemText, Stack, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
type NetType = 'skf' | 'simple' | 'with_hooks'
type ISize = { width: string, height: string }

interface INet {
    w: number
    h: number
    type: NetType
}

function calculateNetSize({ w, h, type }: INet) {
    switch (type) {
        case 'skf': return { w: w - 45, h: h - 47, type }
        case 'simple': return { w: w + 40, h: h + 30, type }
        case 'with_hooks': return { w: w + 24, h: h + 45, type }
    }
}
const net_icon: Record<NetType, React.ReactNode> = {
    skf: <Grid4x4OutlinedIcon />,
    simple: <Grid3x3OutlinedIcon />,
    with_hooks: <AppsOutlinedIcon />
}

const net_locale: Record<NetType, string> = {
    simple: "Простая",
    skf: "SKF",
    with_hooks: "С крючками"
}
const loopType = (type: NetType) => {
    let new_type: NetType = type
    switch (type) {
        case 'skf': {
            new_type = 'simple'
            break
        }
        case 'simple': {
            new_type = 'with_hooks'
            break
        }
        case 'with_hooks': {
            new_type = 'skf'
            break
        }
            break
    }
    return new_type

}

const NetsView = () => {
    const fieldW = useRef<HTMLInputElement | null>(null)
    const [size, setSize] = useState({ width: "", height: "" });
    const [type, setType] = useState<NetType>('skf');
    const [nets, setNets] = useState<{ w: number, h: number, type: NetType, id: number }[]>([]);
    const [sizes, setSizes] = useState<ISize[]>([]);


    const onFinish = () => {
        const net = { w: +size.width, h: +size.height, type, id: nets.length + 1 }
        setSizes(prev => [...prev, size])
        setNets(prev => [...prev, net])
        setSize({ height: "", width: "" })
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            onFinish()
            if (fieldW.current) fieldW.current!.focus()
        }
    }



    return (
        <Box>


            <Box display={ 'flex' } alignItems={ 'center' } gap={ 2 } p={ 2 } onKeyDown={ handleKeyDown }>
                <ButtonGroup >
                    <Button
                        onClick={ () => setType('skf') }
                        variant={ type === 'skf' ? 'contained' : 'outlined' }
                    >
                        SKF
                    </Button>
                    <Button
                        onClick={ () => setType('simple') }
                        variant={ type === 'simple' ? 'contained' : 'outlined' }
                    >
                        Простая
                    </Button>
                    <Button
                        onClick={ () => setType('with_hooks') }
                        variant={ type === 'with_hooks' ? 'contained' : 'outlined' }
                    >
                        С крючками
                    </Button>
                </ButtonGroup>
                <FormControl >
                    <Stack direction={ 'row' } gap={ 1 }>

                        <TextField
                            slotProps={ { htmlInput: { ref: fieldW } } }
                            value={ size.width }
                            onChange={ (e) => setSize(prev => ({ ...prev, width: e.target.value })) }
                        />
                        <TextField value={ size.height }
                            onChange={ (e) => setSize(prev => ({ ...prev, height: e.target.value })) }
                        />

                        <Button onClick={ onFinish } type='submit'
                            variant='contained'
                            color='success'

                        >Рассчитать
                        </Button>
                        <Button onClick={ () => setNets([]) } color='error'>Удалить все</Button>
                    </Stack>
                </FormControl>


            </Box>
            <Stack>

                { nets.map(n =>
                    <NetListItem key={ n.id } { ...n } />
                ) }
            </Stack>


        </Box>
    )
}

const NetListItem = (params: { id: number } & INet) => {
    const [current_type, setType] = useState<NetType>(params.type);
    const { w, h } = calculateNetSize({ ...params, type: current_type })
    const { w: width, h: height } = params;


    return <ListItem
        sx={ { maxWidth: 500 } }
        divider
        secondaryAction={
            <Button
                variant='contained'
                onClick={ () => setType(loopType(current_type)) } >
                { net_locale[current_type] }
            </Button>
        }
    >
        <ListItemAvatar>
            <Avatar variant='circular'>
                { params.id }
            </Avatar>
        </ListItemAvatar>
        <ListItemAvatar>
            <Avatar variant='rounded'>
                { net_icon[current_type] }
            </Avatar>
        </ListItemAvatar>
        <ListItemText
            primary={ `Ш: ${w} x В: ${h}` }
            secondary={ `проем: ${width}:${height}` }
        />
    </ListItem>
}



export default NetsView
