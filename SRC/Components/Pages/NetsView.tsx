'use client'

import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined'
import Grid3x3OutlinedIcon from '@mui/icons-material/Grid3x3Outlined'
import Grid4x4OutlinedIcon from '@mui/icons-material/Grid4x4Outlined'
import { Avatar, Box, Button, ButtonGroup, Divider, FormControl, IconButton, List, ListItem, ListItemAvatar, ListItemText, Stack, TextField } from '@mui/material'
import React, { useMemo, useRef, useState } from 'react'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
type NetType = 'skf' | 'simple' | 'with_hooks'


interface INet {
    w: number
    h: number
    type: NetType
}

interface SizeWithType {
    width: number
    height: number

    type: NetType
    id: number
}
interface MergedNet {
    w: number
    h: number
    amount: number
}


function calculateNetSize({ w, h, type }: INet) {
    switch (type) {
        case 'skf': return { w: w - 45, h: h - 47, type }
        case 'simple': return { w: w + 40, h: h + 30, type }
        case 'with_hooks': return { w: w + 24, h: h + 45, type }
    }
}
const calculated = (type_size: SizeWithType) => {
    const { height, width, type, id } = type_size
    const { w, h } = calculateNetSize({ w: width, h: height, type });
    return {
        size: { width, height },
        net: { w, h },
        type,
        id
    }
}
const groupByType = <T extends { type: NetType }>(array: T[]) => Object.groupBy(array, (a) => a.type)

function mergeNets(nets: { w: number, h: number }[]) {
    const merged = nets.reduce((sum, current) => {
        const foundIdx = sum.findIndex(s => (s.w === current.w && s.h === current.h))
        if (foundIdx < 0) {
            const added_item = { ...current, amount: 1 }
            sum.push(added_item)
            return sum
        } else {
            sum[foundIdx] = { ...sum[foundIdx], amount: sum[foundIdx].amount + 1 }
            return sum
        }

    }, [] as { w: number, h: number, amount: number }[])

    return merged
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
    const [sizes, setSizes] = useState<SizeWithType[]>([]);
    const [merged, setMerged] = useState<Record<NetType, MergedNet[]>>({ skf: [], simple: [], with_hooks: [] });



    const handleSubmit = () => {
        const { width, height } = size
        const id = Date.now()

        const result = {
            width: Number(width),
            height: Number(height),
            type,
            id
        }

        setSizes(prev => [...prev, result])
        setSize({ height: "", width: "" })
    }

    const handleSwitchType = (id: number, new_type: NetType) => setSizes(prev => prev.map(p => p.id === id ? ({ ...p, type: new_type }) : p))

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            handleSubmit()

            if (fieldW.current) fieldW.current!.focus()
        }

    }

    const handleDelete = (id: number) => {
        setSizes(prev => prev.filter(p => p.id !== id))
    }

    const handleDeleteAll = () => {
        setSizes([])
        setMerged({ simple: [], skf: [], with_hooks: [] })
    }
    const netSizes = useMemo(() => {

        return sizes.map(calculated)
    }, [sizes])

    const handleMerge = () => {
        const groups = groupByType(netSizes)
        setMerged({ simple: [], skf: [], with_hooks: [] })
        for (const type in groups) {
            const nets = groups[type as NetType]?.map(g => g.net)
            if (nets) setMerged(prev => ({ ...prev, [type]: mergeNets(nets) }))
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
                            size='small'
                            slotProps={ { htmlInput: { ref: fieldW } } }
                            value={ size.width }
                            onChange={ (e) => setSize(prev => ({ ...prev, width: e.target.value })) }
                        />
                        <TextField
                            size='small'
                            value={ size.height }
                            onChange={ (e) => setSize(prev => ({ ...prev, height: e.target.value })) }
                        />

                        <Button onClick={ handleSubmit } type='submit'
                            variant='contained'
                            color='success'

                        >Рассчитать
                        </Button>
                        <Button
                            variant='outlined'
                            onClick={ handleDeleteAll } color='error'>
                            Удалить все
                        </Button>

                        <Button
                            variant='outlined'
                            onClick={ handleMerge }
                        >
                            Объединить
                        </Button>
                    </Stack>
                </FormControl>


            </Box>
            <Stack direction={ 'row' } maxHeight={ '70vh' } overflow={ 'auto' }>

                <Stack flexGrow={ 2 } >

                    { netSizes.map((n, idx) =>
                        <Box key={ n.id } sx={ { display: 'flex' } }>

                            <NetListItem
                                size={ n.size }
                                net={ n.net }
                                onChangeType={ handleSwitchType }
                                count={ idx + 1 }
                                id={ n.id }
                                type={ n.type }
                            />
                            <IconButton color='error' onClick={ () => handleDelete(n.id) } edge='start' aria-label='delete'>
                                <HighlightOffOutlinedIcon fontSize='large' />
                            </IconButton>
                        </Box>
                    ) }
                </Stack>
                <Stack direction={ 'row' } flexGrow={ 1 }>
                    {
                        merged.simple.length > 0 &&
                        <>
                            <Divider flexItem orientation='vertical' />
                            <MergedNetsList type='simple' nets={ merged.simple } />
                        </>
                    }
                    {
                        merged.skf.length > 0 &&
                        <>
                            <Divider flexItem orientation='vertical' />
                            <MergedNetsList type='skf' nets={ merged.skf } />
                        </>
                    }
                    {
                        merged.with_hooks.length > 0 &&
                        <>
                            <Divider flexItem orientation='vertical' />
                            <MergedNetsList type='with_hooks' nets={ merged.with_hooks } />
                        </>
                    }
                </Stack>


            </Stack>

        </Box>
    )
}

interface NetListItemProps {
    net: { w: number, h: number }
    size: { width: number, height: number }
    onChangeType: (id: number, new_type: NetType) => void
    type: NetType
    count: number
    id: number
}

const NetListItem = (props: NetListItemProps) => {

    const { count, net, onChangeType, size, id, type } = props;

    return <ListItem
        sx={ { maxWidth: 500 } }
        divider
        secondaryAction={
            <Button
                variant='contained'
                onClick={ () => onChangeType(id, loopType(type)) }
                endIcon={ net_icon[type] }
            >
                { net_locale[type] }
            </Button>
        }
    >
        <ListItemAvatar>
            <Avatar variant='circular'>
                { count }
            </Avatar>
        </ListItemAvatar>

        <ListItemText
            primary={ `Ш: ${net.w} x В: ${net.h}` }
            secondary={ `проем: ${size.width}:${size.height}` }
        />
    </ListItem>
}

interface MergedNetsListProps {
    type: NetType
    nets: MergedNet[]
}


const MergedNetsList = ({ nets, type }: MergedNetsListProps) => {


    return <List sx={ { minWidth: 150, bgcolor: 'lightgrey' } } >
        <ListItem divider>
            <ListItemText primary={ net_locale[type] }
                slotProps={ { primary: { fontWeight: 'bold' } } }
            />
        </ListItem>
        { nets.map((n, idx) =>

            <ListItem key={ idx } divider dense>
                <ListItemText
                    primary={ `${n.w} x ${n.h}` }
                    secondary={ `${n.amount} шт.` }
                    slotProps={ {
                        primary: { textAlign: 'right' },
                        secondary: { textAlign: 'right' }
                    } }

                />

            </ListItem>
        ) }
    </List>
}
export default NetsView
