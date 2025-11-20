import SkladControlButtons from "@/Components/Pages/SkladControlButtons";
import SkladItemsView from "@/Components/Pages/SkladItemsView";
import { Box, Button, Container, Paper, Stack } from "@mui/material";

async function SkladControlPage(props: PageProps<'/sklad_control'>) {
    const { params, searchParams } = props;

    return (

        <Paper elevation={ 2 }>
            <Container maxWidth={ "lg" }>

                <Stack direction={ 'row' } spacing={ 2 }>
                    <Box component={ Stack } direction={ 'column' } spacing={ 1 } sx={ { bgcolor: 'lightgrey' } }>
                        <SkladControlButtons />

                    </Box>
                    <Stack sx={ { bgColor: 'grey' } }>
                        <SkladItemsView />
                    </Stack>
                </Stack>

            </Container>
        </Paper>
    )
}

export default SkladControlPage