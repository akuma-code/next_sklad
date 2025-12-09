'use client';
import React, { useState } from 'react';
import { Point, BorderType } from './Drawer';
import { Button, ListItem, ListItemButton, Menu, MenuItem } from '@mui/material';




export const SVG_Rama = (props: { points: { p1: Point; p2: Point; p3: Point; p4: Point; }; type?: BorderType; }) => {
    const { points, type } = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl)

    const stringPoints = [];
    for (const p in points) {
        const coords = `${points[p as keyof typeof points].x} ${points[p as keyof typeof points].y}`;
        stringPoints.push(coords);
    }
    const path = stringPoints.join(",");

    return (
        <>
            <polygon points={ path } stroke='black' fill={ type === 'rama' ? 'red' : 'green' } />
            <Menu open={ open }>
                <MenuItem >

                </MenuItem>
            </Menu>
        </>
    );


};
