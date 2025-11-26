'use client'


import { createUser } from "@/Services/userService"
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material"

export const RegisterForm = () => {
    const action = async (formData: FormData) => {
        const password = formData.get("password") as string
        const username = formData.get("username") as string
        console.log(password)
        const new_user = await createUser({ username, password })
        console.log({ new_user })
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
                    <Stack gap={ 2 }>

                        <Typography variant="h4">Регистрация</Typography>
                        <TextField name="username" />
                        <TextField name="password" type="password" />
                        <Button type="submit" variant="contained">Подтвердить</Button>
                        <Button type="reset" variant="contained" color="error">Отмена</Button>
                    </Stack>
                </Box>
            </form>
        </Container>
    )
}