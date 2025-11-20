'use client'

import { useToggle } from '@/HOOKS/useToggle'
import { Button, ButtonGroup } from '@mui/material'
import CreateSkladDialog from '../Modals/CreateSkladDialog'

const SkladControlButtons = () => {
    const [show_create, create] = useToggle()

    return (
        <>
            <ButtonGroup variant='outlined' orientation='vertical'>
                <Button onClick={ create.toggle }>
                    Create
                </Button>

                <Button >Edit</Button>
            </ButtonGroup>

            <CreateSkladDialog open={ show_create } onClose={ create.off } />
        </>
    )
}

export default SkladControlButtons
