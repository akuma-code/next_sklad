'use client'


import { signIn } from "@/auth"
import { Box, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material"
import Link from "next/link"

export const SigninForm = () => {
    const action = async (formData: FormData) => {

        await signIn("credentials", formData,)
    }


    return (
        <Container maxWidth='md'>
            <form action={ action }>
                <Box
                    width={ 400 }
                    height={ 600 }
                    display={ 'flex' }
                    alignItems={ 'center' }
                    justifyContent={ 'center' }
                    p={ 2 }
                    m={ 2 }
                    bgcolor={ '#504f4f' }
                >

                    <Stack rowGap={ 2 }>
                        <Typography variant="h4">Авторизация</Typography>

                        <TextField name="username" id="username" />
                        <TextField name="password" type="password" id="password" />
                        <Button type="submit" variant="outlined" color="info">Accept</Button>
                        <Button type="reset" variant="outlined" color="error">Nope</Button>
                        <Button LinkComponent={ Link } href="/api/auth/register">Нет аккаунта? Создайте новый!</Button>
                    </Stack>
                </Box>
            </form>
        </Container>
    )
}