import { signIn } from "@/auth"
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material"
import { AuthError } from "next-auth"
import { revalidatePath } from "next/cache"
import Link from "next/link"
import { redirect } from "next/navigation"

const SIGNIN_ERROR_URL = "/error"

export default async function SignInPage(props: {
    searchParams: { callbackUrl: string | undefined }
}) {
    return (
        <Container maxWidth={ 'md' }>
            <form
                action={ async (formData) => {
                    "use server"
                    try {
                        await signIn("credentials", formData)
                        // redirect("/")
                    } catch (error) {
                        if (error instanceof AuthError) {
                            return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
                        }
                        throw error
                    }
                } }
            >
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
                        <Link href="/api/auth/register">Нет аккаунта? Создайте новый!</Link>
                        {/* <Button LinkComponent={ Link } href="/api/auth/register">Нет аккаунта? Создайте новый!</Button> */ }
                    </Stack>
                </Box>
            </form>



        </Container>
    )
}