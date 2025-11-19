import { Box, Button, Container, Paper, Stack } from "@mui/material";

async function SkladControlPage() {

    return (

        <Container maxWidth={ "lg" }>
            <Paper elevation={ 2 }>

                <Stack direction={ 'row' } spacing={ 2 }>
                    <Box component={ Stack } direction={ 'column' } spacing={ 1 }>
                        <Button>Создать</Button>
                        <Button>Редактировать</Button>
                        <Button>Удалить</Button>

                    </Box>
                    <Box>View</Box>
                </Stack>
            </Paper>

        </Container>
    )
}

export default SkladControlPage