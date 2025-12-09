'use client';
import React, { useState } from 'react';
import { SVG_Rama } from './SVG_Rama';
import { BorderType, SideName, SVG_BorderPoints } from './Drawer';


export const RamaModel = ({ borders }: { borders: SVG_BorderPoints; onChangeType?: (side: SideName, type: BorderType) => void }) => {

    const { bottom, left, right, top } = borders;
    const [sideState, setSideState] = useState<Record<SideName, BorderType>>({
        top: 'rama',
        right: 'rama',
        bottom: 'rama',
        left: 'rama'
    });
    return (
        <>
            <SVG_Rama points={ top } type={ top.type } />
            <SVG_Rama points={ left } type={ left.type } />
            <SVG_Rama points={ right } type={ right.type } />
            <SVG_Rama points={ bottom } type={ bottom.type } />
        </>
    );

};
