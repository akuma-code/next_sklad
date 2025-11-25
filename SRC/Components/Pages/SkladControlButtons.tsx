'use client'

import { useToggle } from '@/HOOKS/useToggle'
import { Button, ButtonGroup } from '@mui/material'
import CreateSkladDialog from '../Modals/CreateSkladDialog'
import { checkFinishedProductions } from '@/Services/productionService'
import { useMutation } from '@tanstack/react-query'
import { reseedSkladItems } from '@/Services/skladService'
import { default_sklad } from '@/defaultStuff/default_sklad'

const SkladControlButtons = () => {
    const [show_create, create] = useToggle()
    const { mutate: checkFinished } = useMutation({
        mutationFn: checkFinishedProductions
    });


    return (
        <>
            <ButtonGroup variant='outlined' orientation='vertical'>
                <Button onClick={ create.toggle }>
                    Создать новое
                </Button>

                <Button onClick={ () => checkFinished() }>Закончить начатое</Button>

                <Button onClick={ () => reseedSkladItems(default_sklad) }>Восстановить начальные</Button>
            </ButtonGroup>

            <CreateSkladDialog open={ show_create } onClose={ create.off } />
        </>
    )
}

export default SkladControlButtons
