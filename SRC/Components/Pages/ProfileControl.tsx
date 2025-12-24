'use client'

import { Button, FormControl, MenuItem, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react";

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
const ProfileControl = ({ options }: { options: { id: number, name: string }[] }) => {
    const [controlState, setControlState] = useState<'onCreate' | 'onEdit'>('onCreate');
    const [delta, setDelta] = useState<ProfileData>({
        himpost: 0,
        hrama: 0,
        impost: 0,
        rama: 0,
        stv_impost: 0,
        stv_rama: 0,
        porog: null,
        shtulp_impost: null
    });
    const [systemName, setSystemName] = useState("");
    const handleChangeDelta = (key: keyof ProfileData, value: number) => setDelta(prev => ({ ...prev, [key]: value }))
    const onFinish = () => {
        console.log(systemName, delta)
    }
    return (
        <div>
            <Button onClick={ () => setControlState('onCreate') }>Создать</Button>
            <Button onClick={ () => setControlState('onEdit') }>Редактировать</Button>

            { controlState === 'onCreate' && <CreateForm /> }
            { controlState === 'onEdit' && <EditForm options={ options } /> }
        </div>
    )
}

export default ProfileControl
function CreateForm() {

    const [delta, setDelta] = useState<ProfileData>({
        himpost: 0,
        hrama: 0,
        impost: 0,
        rama: 0,
        stv_impost: 0,
        stv_rama: 0,
        porog: null,
        shtulp_impost: null
    });
    const [systemName, setSystemName] = useState("");
    const handleChangeDelta = (key: keyof ProfileData, value: number) => setDelta(prev => ({ ...prev, [key]: value }))
    const onFinish = () => {
        console.log(systemName, delta)
    }

    return <form className="p-2 pt-4">
        <FormControl component={ Stack } gap={ 2 }>

            <Typography>
                Create new system
            </Typography>
            <TextField label='Название'
                value={ systemName }
                onChange={ (e) => setSystemName(e.target.value) } />
            <TextField label='Створка-рама'
                value={ delta.stv_rama }
                onChange={ (e) => handleChangeDelta('stv_rama', +e.target.value) } />
            <TextField label='Створка-импост'
                value={ delta.stv_impost }
                onChange={ (e) => handleChangeDelta('stv_impost', +e.target.value) } />
            <TextField label='Фикса-рама'
                value={ delta.rama }
                onChange={ (e) => handleChangeDelta('rama', +e.target.value) } />
            <TextField label='Фикса-импост'
                value={ delta.impost }
                onChange={ (e) => handleChangeDelta('impost', +e.target.value) } />
            <TextField label='Штульп-импост'
                value={ delta.shtulp_impost || 0 }
                onChange={ (e) => handleChangeDelta('shtulp_impost', +e.target.value) } />
            <TextField label='Высота рамы'
                value={ delta.hrama }
                onChange={ (e) => handleChangeDelta('hrama', +e.target.value) } />
            <TextField label='Высота импоста'
                value={ delta.himpost }
                onChange={ (e) => handleChangeDelta('himpost', +e.target.value) } />
            <TextField label='Створка-порог'
                value={ delta.porog || 0 }
                onChange={ (e) => handleChangeDelta('porog', +e.target.value) } />
            <Button onClick={ onFinish }>Create</Button>
            <Button>Cancel</Button>
        </FormControl>
    </form>;
}
function EditForm({ options }: { options: { id: number, name: string }[] }) {

    const [delta, setDelta] = useState<ProfileData>({
        himpost: 0,
        hrama: 0,
        impost: 0,
        rama: 0,
        stv_impost: 0,
        stv_rama: 0,
        porog: null,
        shtulp_impost: null
    });
    const [systemName, setSystemName] = useState("");
    const handleChangeDelta = (key: keyof ProfileData, value: number) => setDelta(prev => ({ ...prev, [key]: value }))
    const onFinish = () => {
        console.log(systemName, delta)
    }

    return <form className="p-2 pt-4">
        <FormControl component={ Stack } gap={ 2 }>

            <Typography>
                Edit System
            </Typography>
            <TextField
                select
                label='Название'
                value={ systemName }
                onChange={ (e) => setSystemName(e.target.value) }
            >

                { options.map(o =>
                    <MenuItem key={ o.id } value={ o.name }>
                        { o.name }
                    </MenuItem>
                ) }
            </TextField>
            <TextField label='Створка-рама'
                value={ delta.stv_rama }
                onChange={ (e) => handleChangeDelta('stv_rama', +e.target.value) } />
            <TextField label='Створка-импост'
                value={ delta.stv_impost }
                onChange={ (e) => handleChangeDelta('stv_impost', +e.target.value) } />
            <TextField label='Фикса-рама'
                value={ delta.rama }
                onChange={ (e) => handleChangeDelta('rama', +e.target.value) } />
            <TextField label='Фикса-импост'
                value={ delta.impost }
                onChange={ (e) => handleChangeDelta('impost', +e.target.value) } />
            <TextField label='Штульп-импост'
                value={ delta.shtulp_impost || 0 }
                onChange={ (e) => handleChangeDelta('shtulp_impost', +e.target.value) } />
            <TextField label='Высота рамы'
                value={ delta.hrama }
                onChange={ (e) => handleChangeDelta('hrama', +e.target.value) } />
            <TextField label='Высота импоста'
                value={ delta.himpost }
                onChange={ (e) => handleChangeDelta('himpost', +e.target.value) } />
            <TextField label='Створка-порог'
                value={ delta.porog || 0 }
                onChange={ (e) => handleChangeDelta('porog', +e.target.value) } />
            <Button onClick={ onFinish }>Create</Button>
            <Button>Cancel</Button>
        </FormControl>
    </form>;
}

