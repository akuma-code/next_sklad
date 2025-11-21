'use client'

import { useToggle } from '@/HOOKS/useToggle'
import { Button, ButtonGroup } from '@mui/material'
import CreateSkladDialog from '../Modals/CreateSkladDialog'
import { checkFinishedProductions } from '@/Services/productionService'
import { useMutation } from '@tanstack/react-query'

const SkladControlButtons = () => {
    const [show_create, create] = useToggle()
    const { mutate: checkFinished } = useMutation({
        mutationFn: checkFinishedProductions
    });


    return (
        <>
            <ButtonGroup variant='outlined' orientation='vertical'>
                <Button onClick={ create.toggle }>
                    Create
                </Button>

                <Button onClick={ () => checkFinished() }>Check Finished</Button>
            </ButtonGroup>

            <CreateSkladDialog open={ show_create } onClose={ create.off } />
        </>
    )
}

export default SkladControlButtons
