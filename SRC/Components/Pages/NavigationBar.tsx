'use client'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import Link from 'next/link';
import { Icon, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack } from '@mui/material';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Grid4x4Icon from '@mui/icons-material/Grid4x4';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import { useToggle } from '@/HOOKS/useToggle';



const routes = [
    {
        title: "Склад",
        to: '/sklad',
        icon: <WarehouseOutlinedIcon />
    },

]
const protected_routes = [
    {
        title: "Управление",
        to: '/sklad_control',
        icon: <BuildOutlinedIcon />
    },
]
const other_routes = [
    {
        title: "Сетки",
        to: '/nets',
        icon: <Grid4x4Icon />
    },
    // {
    //     title: "Калькулятор",
    //     to: '/tps',
    //     icon: <Grid4x4Icon />
    // },
    // {
    //     title: "ПрофильКонтроль",
    //     to: '/tps/control',
    //     icon: <Grid4x4Icon />
    // },
]

export default function NavigationBar() {
    const session = useSession()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorElOther, setAnchorElOther] = useState<null | HTMLElement>(null);
    // const [menu_open, setMenuOpen] = useState(false)
    const open = Boolean(anchorEl);
    const open_other = Boolean(anchorElOther)

    const handleClose = () => {
        setAnchorEl(null);

    };
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);

        // handleClose()
    };
    const isAuth = session.status === 'authenticated'
    return (
        <Box sx={ { flexGrow: 1 } }>
            <AppBar position="static">
                <Toolbar >

                    <Stack direction={ 'row' } justifyContent={ 'space-between' } alignItems={ 'center' } width={ '100%' }>

                        <Stack direction={ 'row' } minWidth={ 400 } gap={ 2 } >

                            {
                                routes.map(r =>

                                    <ListItem key={ r.to }>
                                        <ListItemButton LinkComponent={ Link } href={ r.to } >
                                            <ListItemIcon sx={ { color: 'white' } }>
                                                { r.icon }
                                            </ListItemIcon>
                                            <ListItemText primary={ r.title } />
                                        </ListItemButton>

                                    </ListItem>
                                )
                            }
                            {
                                isAuth && protected_routes.map(r =>

                                    <ListItem key={ r.to }>
                                        <ListItemButton LinkComponent={ Link } href={ r.to } >
                                            <ListItemIcon sx={ { color: 'white' } }>
                                                { r.icon }
                                            </ListItemIcon>
                                            <ListItemText primary={ r.title } />
                                        </ListItemButton>

                                    </ListItem>
                                )
                            }
                        </Stack>
                        { isAuth &&
                            <Box>
                                <Button
                                    variant='text'
                                    color='warning'
                                    onClick={ (event) => setAnchorElOther(event.currentTarget) }
                                    startIcon={ <ViewTimelineIcon /> }
                                >
                                    Дополнительно
                                </Button>
                                <Menu open={ open_other } onClose={ () => setAnchorElOther(null) } anchorEl={ anchorElOther }>

                                    { other_routes.map(r =>
                                        <MenuItem key={ r.to }>
                                            <ListItemButton
                                                dense
                                                LinkComponent={ Link }
                                                href={ r.to }
                                            >
                                                <ListItemIcon>
                                                    { r.icon }
                                                </ListItemIcon>
                                                { r.title }
                                            </ListItemButton>
                                        </MenuItem>
                                    ) }
                                </Menu>
                            </Box>
                        }
                        <Box flexGrow={ 0 }>
                            <IconButton onClick={ handleClick } sx={ { bgcolor: isAuth ? 'white' : 'yellow' } } >
                                <MenuIcon />
                            </IconButton>
                            <Menu open={ open } onClose={ handleClose } anchorEl={ anchorEl }>
                                <MenuItem>
                                    <Button
                                        LinkComponent={ Link }
                                        href='/api/auth/login'
                                    >Авторизация</Button>
                                </MenuItem>
                                <MenuItem>
                                    <Button
                                        onClick={ () => signOut() }
                                    >Выход</Button>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Stack>

                </Toolbar>
            </AppBar>
        </Box>
    );
}
