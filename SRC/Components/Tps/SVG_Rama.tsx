'use client';
import React, { useState } from 'react';
import { Point, BorderType, makePath } from './Drawer';
import { Button, ListItem, ListItemButton, Menu, MenuItem } from '@mui/material';




export const SVG_Rama = (props: { points: { p1: Point; p2: Point; p3: Point; p4: Point; }; type?: BorderType; fillColor?: string }) => {
    const { points, type, fillColor } = props;
    const { p1, p2, p3, p4 } = points;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl)

    const color = fillColor ? fillColor : type === 'rama' ? 'red' : 'green'
    const rama_path = makePath(p1, p2, p3, p4)
    return (
        <>
            <polygon points={ rama_path } stroke='black' fill={ color } />
            {/* <Menu open={ open }>
                <MenuItem >

                </MenuItem>
            </Menu> */}
        </>
    );


};
