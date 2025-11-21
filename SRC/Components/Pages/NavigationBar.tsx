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
import { Icon, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
const routes = [
    {
        title: "Склад",
        to: '/sklad',
        icon: <WarehouseOutlinedIcon />
    },
    {
        title: "Управление",
        to: '/sklad_control',
        icon: <BuildOutlinedIcon />
    },
]


export default function NavigationBar() {
    return (
        <Box sx={ { flexGrow: 1 } }>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={ { mr: 2 } }
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Stack direction={ 'row' } spacing={ 3 } minWidth={ 400 } gap={ 2 }>

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
                    </Stack>

                    {/* <Button color="inherit">Login</Button> */ }
                </Toolbar>
            </AppBar>
        </Box>
    );
}
