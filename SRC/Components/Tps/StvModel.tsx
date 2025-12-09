'use client';
import React from 'react';
import { SVG_Rama } from './SVG_Rama';
import { SVG_BorderPoints, _p } from './Drawer';


export const StvModel = ({ borders }: { borders: SVG_BorderPoints; }) => {

    const { bottom, left, right, top } = borders;
    const door_stick = {
        p1: _p(right.p1.x - 40, right.p1.y / .75),
        p2: _p(right.p1.x - 40, right.p4.y * .75),
    };

    const stick_points = [door_stick.p1.toStr(), door_stick.p2.toStr()].join(" ");
    return (
        <>
            <SVG_Rama points={ top } type='rama' />
            <SVG_Rama points={ left } type='rama' />
            <SVG_Rama points={ right } type='rama' />
            <SVG_Rama points={ bottom } type='rama' />
            <polyline points={ stick_points } stroke='black' strokeWidth={ 8 } />
        </>
    );

};
