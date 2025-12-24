'use client'

import { useFrameDrawer } from '@/HOOKS/useFrameDrawer'
import { Box, Button, ButtonGroup, Divider, List, ListItem, ListItemText, MenuItem, Paper, Stack, TextField } from '@mui/material'
import { useState } from 'react'
import CanvasTPS from './CanvasTPS'
import { BorderType, SideName, StvState } from './Drawer'
import { RamaModel } from './RamaModel'
import { StvModel } from './StvModel'
import { glassData, useGlassCalculator } from '@/HOOKS/useGlassCalculator'

type ProfileData = {
    stv_rama: number;
    stv_impost: number;
    rama: number;
    impost: number;
    hrama: number;
    himpost: number;
    porog?: number | null | undefined;
    shtulp_impost?: number | null | undefined;
}

const deltaLocale: Record<keyof ProfileData, string> = {
    himpost: 'Высота импоста',
    hrama: "Высота рамы",
    impost: "Фикса-Импост",
    rama: "Фикса-Рама",
    stv_impost: "Створка-Импост",
    stv_rama: "Створка-Рама",
    porog: "Створка-Порог",
    shtulp_impost: "Штульп-Импост"
}

const stvItems = [
    { label: 'Фикса', value: null },
    { label: 'Створка', value: 'stv' },
    { label: 'Штульп', value: 'shtulp' },
] as { label: string, value: StvState }[]

const borderItems = [
    { label: 'Рама', value: 'rama' },
    { label: 'Импост', value: 'imp' },
] as { label: string, value: BorderType }[]


const TpsControl = () => {

    const [sideState, setSideState] = useState<Record<SideName, BorderType>>({
        top: 'rama',
        right: 'rama',
        bottom: 'rama',
        left: 'rama'
    });
    const [size, setSize] = useState({ width: "", height: "" });
    const [glass, setGlass] = useState("");
    const [profile, setProfile] = useState("Proline");
    const [stvState, setStvState] = useState<StvState>(null);

    const [rama, stv] = useFrameDrawer({
        border_state: sideState,
        stv_state: stvState,
        sizes: {
            height: 400,
            width: 400,
            pos: { x: 50, y: 50 }
        }
    })
    const [glassSize, deltas] = useGlassCalculator(profile, stvState, sideState, { width: +size.width, height: +size.height })
    const { S, Weight } = glassData(glassSize)
    const changeSideState = (side: SideName, type: BorderType) => {
        setSideState(prev => ({ ...prev, [side]: type }))
    }

    const handleStvStateChange = (state: StvState) => setStvState(state)

    const getDebugInfo = (data: ProfileData) => {
        if (data) {

            const res = Object.entries(data).map(([k, v]) => {
                return { prim: `${k}: ${v}`, sec: deltaLocale[k as keyof ProfileData] }
            })

            return res
        }
    }
    const debugInfo = getDebugInfo(deltas as ProfileData)

    return (
        <Stack direction={ 'row' } justifyContent={ 'space-evenly' } gap={ 3 }>
            <Stack direction={ 'column' } gap={ 1 } flexGrow={ 1 }>
                <TextField select

                    value={ profile }
                    onChange={ (e) => setProfile(e.target.value) }
                    helperText='select profile system'
                >
                    <MenuItem value={ 'Proline' }>Veka Proline</MenuItem>
                    <MenuItem value={ 'Softline' }>Veka Softline</MenuItem>
                </TextField>
                <TextField
                    value={ size.width }
                    onChange={ (e) => setSize(prev => ({ ...prev, width: e.target.value })) }
                    label={ 'Width' }
                    helperText='Input width'
                />
                <TextField
                    value={ size.height }
                    onChange={ (e) => setSize(prev => ({ ...prev, height: e.target.value })) }
                    label={ 'Height' }
                    helperText='Input height'
                />
                <TextField value={ glass } onChange={ (e) => setGlass(e.target.value) }
                    label='Glass'
                    helperText="Input glass sizes"
                />

            </Stack>
            <Stack direction={ 'row' } flexGrow={ 1 }>
                <Box display={ 'flex' } alignItems={ 'center' }>

                    <BorderControlButtons
                        items={ borderItems }
                        side='left'
                        clickHandler={ changeSideState }
                        orientation='vertical'
                    />
                </Box>

                <Stack gap={ 1 }>

                    <StvControlButtons
                        items={ stvItems }
                        clickHandler={ handleStvStateChange }
                    />
                    <Box display={ 'flex' } alignItems={ 'center' } justifyContent={ 'center' }>
                        <BorderControlButtons
                            items={ borderItems }
                            side='top'
                            clickHandler={ changeSideState }
                        />
                    </Box>


                    <CanvasTPS
                        style='m-1 p-1'
                    >
                        <RamaModel borders={ rama } />
                        <StvModel borders={ stv } stv_state={ stvState } />
                    </CanvasTPS>


                    <Box display={ 'flex' } alignItems={ 'center' } justifyContent={ 'center' }>

                        <BorderControlButtons
                            items={ borderItems }
                            side='bottom'
                            clickHandler={ changeSideState }
                        />
                    </Box>

                </Stack>
                <Box display={ 'flex' } alignItems={ 'center' }>

                    <BorderControlButtons
                        items={ borderItems }
                        side='right'
                        clickHandler={ changeSideState }
                        orientation='vertical'
                    />
                </Box>

            </Stack>
            <Stack flexGrow={ 1 }>
                <Box
                    height={ '100%' }
                    bgcolor={ 'grey' }
                >
                    <List>

                        <ListItem>
                            <ListItemText primary={ `${S} кв. м` } secondary='Площадь стеклопакета' />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={ `${Weight(12)} кг` } secondary='Вес стеклопакета' />
                        </ListItem>

                    </List>
                    <Divider flexItem orientation='horizontal' sx={ { fontWidth: 'bold', } } />
                    <List>
                        <Paper elevation={ 1 }>
                            <ListItemText primary='Debug Info' slotProps={ { primary: { textAlign: 'center' } } } />
                            { debugInfo && debugInfo.map((i, idx) =>
                                <ListItem dense divider
                                    key={ idx }
                                >
                                    <ListItemText primary={ i.prim } secondary={ i.sec } />
                                </ListItem>
                            ) }
                        </Paper>
                    </List>
                </Box>
            </Stack>

        </Stack>
    )
}


interface StvControlProps {
    items: {
        label: string
        value: StvState
    }[]
    clickHandler: (value: StvState) => void
}

const StvControlButtons = ({ items, clickHandler }: StvControlProps) => {
    const [selected, setSelected] = useState(0);
    const onClickFn = (idx: number, value: StvState) => {
        setSelected(idx)
        clickHandler(value)
    }
    return (
        <Box
            component={ Stack }
            direction={ 'row' }
            gap={ 1 }
            justifyContent={ 'center' }
        >
            { items.map((i, idx) =>
                <Button
                    sx={ { borderRadius: '50%' } }
                    key={ i.label }
                    variant={ selected === idx ? 'contained' : 'outlined' }
                    onClick={ () => onClickFn(idx, i.value) }>
                    { i.label }
                </Button>
            ) }
        </Box>
    )

}

interface BorderControlProps {
    items: {
        label: string
        value: BorderType
    }[]
    side: SideName
    clickHandler: (side: SideName, value: BorderType) => void

    orientation?: 'vertical' | 'horizontal'
}

const BorderControlButtons = ({ items, side, clickHandler, orientation = 'horizontal' }: BorderControlProps) => {

    const [selected, setSelected] = useState(0);
    const onClickFn = (idx: number, value: BorderType) => {
        setSelected(idx)
        clickHandler(side, value)
    }
    return (
        <ButtonGroup

            size='small'
            color='secondary'
            // sx={ { rotate: orientation === 'vertical' ? '270deg' : '0' } }
            orientation={ orientation }
        >
            { items.map((i, idx) =>
                <Button
                    key={ i.label }
                    variant={ selected === idx ? 'contained' : 'outlined' }
                    onClick={ () => onClickFn(idx, i.value) }>
                    { i.label }
                </Button>
            ) }
        </ButtonGroup>
    )
}


export default TpsControl
