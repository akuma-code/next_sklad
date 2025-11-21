import { Container, Paper } from "@mui/material";

export default function WarehouseLayout({ children }: LayoutProps<'/'>) {


    return <Container maxWidth={ 'xl' }>
        <Paper elevation={ 1 }>

            { children }
        </Paper>
    </Container>
}