'use client'

import { BorderType, Frame, SideName, StvFrame, StvState } from "@/Components/Tps/Drawer"
import { useMemo } from "react"

export type FrameDrawerProps = {
    border_state: Record<SideName, BorderType>
    stv_state: StvState
    sizes?: {
        width: number
        height: number
        pos: { x: number, y: number }
    }
}
export function useFrameDrawer({ sizes, border_state, stv_state }: FrameDrawerProps) {

    const rama = useMemo(() => {
        const r = new Frame(sizes?.width || 400, sizes?.height || 400, { x: sizes?.pos.x || 0, y: sizes?.pos.y || 0 })
        return r.getBorders(border_state)
    }, [border_state, sizes])

    const stvorka = useMemo(() => {
        const s = new StvFrame(stv_state, sizes?.width || 400, sizes?.height || 400, { x: sizes?.pos.x || 0, y: sizes?.pos.y || 0 })
        return s.getStv()
    }, [sizes, stv_state])


    return [rama, stvorka]
}