'use client'

import { BorderType, SideName, StvState } from "@/Components/Tps/Drawer";
import { getProfileDelta } from "@/Services/profileService";
import { useQuery } from "@tanstack/react-query";

export function useGlassCalculator(system: string, stv_state: StvState, borders: Record<SideName, BorderType>, size: { width: number, height: number }) {

    const q = useQuery({
        queryKey: [system],
        queryFn: async () => await getProfileDelta(system),
        throwOnError: true
    })

    let delta = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
    // if (q.isError || !q.data) return { w: 0, h: 0 }
    if (!q.isSuccess) return [{ w: 0, h: 0 }]


    const { himpost, hrama, impost, porog, rama, shtulp_impost, stv_impost, stv_rama } = q.data!;
    if (!stv_state) {
        const top = borders.top === 'rama' ? rama : impost
        const left = borders.left === 'rama' ? rama : impost
        const right = borders.right === 'rama' ? rama : impost
        const bottom = borders.bottom === 'rama' ? rama : impost
        delta = { top, bottom, right, left }
    }


    switch (stv_state) {
        case "stv": {
            const top = borders.top === 'rama' ? stv_rama : stv_impost
            const left = borders.left === 'rama' ? stv_rama : stv_impost
            const right = borders.right === 'rama' ? stv_rama : stv_impost
            const bottom = borders.bottom === 'rama' ? stv_rama : stv_impost
            delta = { top, bottom, right, left }
            break
        }
        case "shtulp": {
            const top = borders.top === 'rama' ? stv_rama : stv_impost
            const left = borders.left === 'rama' ? stv_rama : shtulp_impost || 0
            const right = borders.right === 'rama' ? stv_rama : shtulp_impost || 0
            const bottom = borders.bottom === 'rama' ? stv_rama : stv_impost
            delta = { top, bottom, right, left }
            break
        }
        case "door": {
            const top = borders.top === 'rama' ? stv_rama : stv_impost
            const left = borders.left === 'rama' ? stv_rama : stv_impost
            const right = borders.right === 'rama' ? stv_rama : stv_impost
            const bottom = borders.bottom === 'rama' ? stv_rama : stv_impost
            delta = { top, bottom, right, left }
            break
        }
    }


    const glass = {
        w: size.width - (delta.left + delta.right),
        h: size.height - (delta.top + delta.bottom)
    }
    const deltas = { ...q.data }
    // console.log(delta)
    // console.log(glass)


    return [glass, deltas] as const


}

export function glassData(glass: { w: number, h: number }) {
    const { w, h } = glass;

    const S = (w / 1000 * h / 1000).toFixed(2)
    const Weight = (glass_width: number) => (Number(S) * glass_width * 2.5).toFixed(1)

    return { S, Weight }

}