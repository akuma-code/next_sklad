'use client';
import React from 'react';
import { SVG_Rama } from './SVG_Rama';
import { SVG_BorderPoints, StvState, _p, makePath } from './Drawer';


export const StvModel = ({ borders, stv_state }: { borders: SVG_BorderPoints; stv_state: StvState }) => {
    if (!stv_state) return null
    const { bottom, left, right, top } = borders;
    const door_stick = {
        p1: _p(right.p1.x - 40, right.p1.y + 140),
        p2: _p(right.p4.x - 40, right.p4.y - 140),
    };

    const stick_points = [door_stick.p1.toStr(), door_stick.p2.toStr()].join(" ");
    const stick_points_hor = [
        _p(door_stick.p1.x, door_stick.p1.y + (door_stick.p2.y - door_stick.p1.y) / 2),
        _p(door_stick.p1.x - 60, door_stick.p1.y + (door_stick.p2.y - door_stick.p1.y) / 2),
    ]
    const petla = {
        up: [_p(left.p4.x - 5, left.p4.y + 20), _p(left.p4.x - 5, left.p4.y + 80)],
        down: [_p(left.p1.x - 5, left.p1.y - 20), _p(left.p1.x - 5, left.p1.y - 80)]
    }
    const glsPoints = [
        top.p2,
        top.p3,
        bottom.p2,
        bottom.p3
    ]
    const color = stv_state === 'stv' ? 'darkred' : stv_state === 'door' ? 'yellow' : stv_state === 'shtulp' ? 'orange' : 'inherit'
    return (
        <g >
            <SVG_Rama points={ top } type='rama' fillColor={ color } />
            <SVG_Rama points={ left } type='rama' fillColor={ color } />
            <SVG_Rama points={ right } type='rama' fillColor={ color } />
            <SVG_Rama points={ bottom } type='rama' fillColor={ color } />
            <polygon points={ makePath(...glsPoints) }
                fill='#3095e7'
                stroke='white'
            />
            <polyline points={ stick_points } stroke='black' strokeWidth={ 14 } />
            <polyline points={ makePath(...stick_points_hor) } stroke='black' strokeWidth={ 18 } />
            <polyline points={ makePath(...petla.up) } stroke='black' strokeWidth={ 10 } />
            <polyline points={ makePath(...petla.down) } stroke='black' strokeWidth={ 10 } />
        </g>
    );

};
