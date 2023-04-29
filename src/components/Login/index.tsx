import * as React from 'react'
import {
    Box,
    Link,
    TextField,
    CssBaseline,
    Button,
    Grid,
    Avatar,
    Typography,
    Container,
    FormControlLabel,
    Checkbox,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { getAuth } from '../../services/api/api'
import { useContext, useState } from 'react'
import ContextProvider, { UserContext } from '../../services/context/contextProvider'

const theme = createTheme()

const Login = ({ token }: any) => {
    const [isToken, setToken] = React.useState({accessToken: ''});

    const {user, setUser} = useContext(UserContext)

    const getToken = async ({login, password}: any) => {
        const token = await getAuth({login: login, password: password })        
        setToken(token)
        setUser({token, login})
        console.log(token);
        console.log(user);
        
        return token
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const token = await getToken({
            login: data.get('login'),
            password: data.get('password'),
        })
        setToken(token)
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Авторизация
                    </Typography>
                    <Box
                        component='form'
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='login'
                            label='Login'
                            name='login'
                            autoComplete='login'
                            autoFocus
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                        />
                        {/* <FormControlLabel
                            control={
                                <Checkbox value='remember' color='primary' />
                            }
                            label='Remember me'
                        /> */}
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        {/* <Grid container>
                            <Grid item xs>
                                <Link href='/recovery' variant='body2'>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href='/signup' variant='body2'>
                                    {'Do not have an account? Sign Up'}
                                </Link>
                            </Grid>
                        </Grid> */}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Login
