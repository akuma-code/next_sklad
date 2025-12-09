'use client'

import { Box, Button, MenuItem, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import CanvasTPS from './CanvasTPS'
import { StvModel } from './StvModel'
import { RamaModel } from './RamaModel'
import { _p, BorderType, CommonState, Frame, SideName, StvFrame } from './Drawer'

const TpsControl = () => {

    const [sideState, setSideState] = useState<Record<SideName, BorderType>>({
        top: 'rama',
        right: 'rama',
        bottom: 'rama',
        left: 'rama'
    });
    const [size, setSize] = useState({ width: "", height: "" });
    const [glass, setGlass] = useState("");
    const [profile, setProfile] = useState("");

    const [calcState, setCalcState] = useState<CommonState>("stv");


    const changeSideState = (side: SideName, type: BorderType) => {
        setSideState(prev => ({ ...prev, [side]: type }))
    }
    const rama = new Frame(400, 400, _p(50, 50))
    const stv = new StvFrame(400, 400, _p(50, 50))
    return (
        <Stack direction={ 'row' } justifyContent={ 'space-evenly' } gap={ 2 }>
            <Stack direction={ 'column' } gap={ 1 } flexGrow={ 0 }>
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
                <TextField select

                    value={ profile }
                    onChange={ (e) => setProfile(e.target.value) }
                    helperText='select profile system'
                >
                    <MenuItem value={ 'Proline' }>Proline</MenuItem>
                    <MenuItem value={ 'SoftLine' }>Softline</MenuItem>
                </TextField>
                <TextField value={ glass } onChange={ (e) => setGlass(e.target.value) }
                    label='Glass'
                    helperText="Input glass sizes"
                />

            </Stack>
            <Stack direction={ 'row' } flexGrow={ 2 }>
                <Button variant='outlined'
                    onClick={ () => changeSideState('left', sideState.left === 'rama' ? 'imp' : 'rama') }>Left</Button>
                <Stack>

                    <Button variant='outlined'
                        onClick={ () => setCalcState(prev => prev === 'fix' ? 'stv' : 'fix') }>STVORKA</Button>
                    <Button variant='outlined'
                        onClick={ () => changeSideState('top', sideState.top === 'rama' ? 'imp' : 'rama') }>TOP</Button>
                    <CanvasTPS  >
                        <RamaModel borders={ rama.getBorders(sideState) } />
                        { calcState === 'stv' && <StvModel borders={ stv.getStv() } /> }
                    </CanvasTPS>
                    <Button variant='outlined'
                        onClick={ () => changeSideState('bottom', sideState.bottom === 'rama' ? 'imp' : 'rama') }>BOT</Button>
                </Stack>
                <Button variant='outlined'
                    onClick={ () => changeSideState('right', sideState.right === 'rama' ? 'imp' : 'rama') }>Right</Button>
            </Stack>
            <Stack flexGrow={ 1 }>
                <Box
                    height={ '100%' }
                    bgcolor={ 'grey' }
                >

                    Results
                </Box>
            </Stack>

        </Stack>
    )
}

export default TpsControl
