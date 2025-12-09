type TCoords = [Point, Point]
export type BorderType = 'rama' | 'imp'
export type SideName = 'top' | 'bottom' | 'left' | 'right'
export type CommonState = 'fix' | 'stv' | 'svet'
export interface SVG_Points {
    p1: Point
    p2: Point
    p3: Point
    p4: Point
    type?: BorderType
}

export type SVG_BorderPoints = Record<SideName, SVG_Points>
export class Point {
    constructor(public x: number, public y: number) { }

    toStr() {
        return `${this.x} ${this.y}`
    }

    offset(offX: number, offY?: number) {
        const oy = offY ? offY : offX
        const ox = offX
        // this.x = this.x + ox
        // this.y = this.y + oy
        return _p(this.x + ox, this.y + oy)
    }
}

export const _p = (x: number, y: number) => new Point(x, y)
class BaseFrame {
    w: number
    h: number
    pos: Point
    hp = 65 // высота профиля (для смещения)
    stv_offset = 20 // смещение створки относительно рамы
    top!: TCoords
    right!: TCoords
    bottom!: TCoords
    left!: TCoords

    constructor(w: number, h: number, pos: Point = _p(0, 0)) {
        this.w = w
        this.h = h
        this.pos = pos
        this.getSideCoords()
    }

    getSideCoords() {
        const top: TCoords = [_p(this.pos.x, this.pos.y), _p(this.pos.x + this.w, this.pos.y)]
        const right: TCoords = [_p(this.pos.x + this.w, this.pos.y), _p(this.pos.x + this.w, this.pos.y + this.h)]
        const bottom: TCoords = [_p(this.pos.x + this.w, this.pos.y + this.h), _p(this.pos.x, this.pos.y + this.h)]
        const left: TCoords = [_p(this.pos.x, this.pos.y + this.h), _p(this.pos.x, this.pos.y)]
        this.top = top
        this.bottom = bottom
        this.left = left
        this.right = right
    }

}

export class Frame extends BaseFrame {

    constructor(w: number, h: number, pos = _p(0, 0)) {
        super(w, h, pos)

    }
    getBorders(side_state: Record<SideName, BorderType> = { top: 'rama', left: 'rama', right: 'rama', bottom: 'rama' }) {
        const { bottom, left, right, top } = side_state;

        const points_top = this.getTopBorder(top, left, right)
        const points_left = this.getLeftBorder(left, bottom, top)
        const points_right = this.getRightBorder(right, top, bottom)
        const points_bottom = this.getBottomBorder(bottom, right, left)

        const borders = {
            top: points_top,
            left: points_left,
            bottom: points_bottom,
            right: points_right
        }
        return borders
    }
    getTopBorder(type: BorderType, startConnection: BorderType, endConnection: BorderType) {

        const off = (connection: BorderType) => connection === 'rama' ? this.hp : 0


        switch (type) {
            case "rama": {
                const [p1, p2] = this.top
                const p3: Point = _p(p2.x - off(endConnection), p2.y + this.hp)
                const p4: Point = _p(p1.x + off(startConnection), p1.y + this.hp)
                return { p1, p2, p3, p4, type }
            }
            case "imp": {
                const [s, e] = this.top
                const p1 = startConnection === 'rama' ? _p(s.x + this.hp, s.y) : _p(s.x, s.y)
                const p2 = startConnection === 'rama' ? _p(s.x + this.hp, s.y + this.hp / 2) : _p(s.x, s.y + this.hp / 2)
                const p3 = endConnection === 'rama' ? _p(e.x - this.hp, e.y + this.hp / 2) : _p(e.x, e.y + this.hp / 2)
                const p4 = endConnection === 'rama' ? _p(e.x - this.hp, e.y) : _p(e.x, e.y)
                return { p1, p2, p3, p4, type }
            }
        }

    }
    getRightBorder(type: BorderType, startConnection: BorderType, endConnection: BorderType) {
        const off = (connection: BorderType) => connection === 'rama' ? this.hp : 0


        switch (type) {
            case "rama": {
                const [p1, p2] = this.right
                const p3: Point = _p(p2.x - this.hp, p2.y - off(endConnection))
                const p4: Point = _p(p1.x - this.hp, p1.y + off(startConnection))
                return { p1, p2, p3, p4, type }
            }
            case "imp": {
                const [s, e] = this.right
                const p1 = startConnection === 'rama' ? _p(s.x, s.y + this.hp) : _p(s.x, s.y)
                const p2 = startConnection === 'rama' ? _p(s.x - this.hp / 2, s.y + this.hp) : _p(s.x - this.hp / 2, s.y)
                const p3 = endConnection === 'rama' ? _p(e.x - this.hp / 2, e.y - this.hp) : _p(e.x - this.hp / 2, e.y)
                const p4 = endConnection === 'rama' ? _p(e.x, e.y - this.hp) : _p(e.x, e.y)
                return { p1, p2, p3, p4, type }
            }
        }

    }
    getBottomBorder(type: BorderType, startConnection: BorderType, endConnection: BorderType) {
        const off = (connection: BorderType) => connection === 'rama' ? this.hp : 0


        switch (type) {
            case "rama": {
                const [p1, p2] = this.bottom
                const p3: Point = _p(p2.x + off(endConnection), p2.y - this.hp)
                const p4: Point = _p(p1.x - off(startConnection), p1.y - this.hp)
                return { p1, p2, p3, p4, type }
            }
            case "imp": {
                const [s, e] = this.bottom
                const p1 = startConnection === 'rama' ? _p(s.x - this.hp, s.y) : _p(s.x, s.y)
                const p2 = startConnection === 'rama' ? _p(s.x - this.hp, s.y - this.hp / 2) : _p(s.x, s.y - this.hp / 2)
                const p3 = endConnection === 'rama' ? _p(e.x + this.hp, e.y - this.hp / 2) : _p(e.x, e.y - this.hp / 2)
                const p4 = endConnection === 'rama' ? _p(e.x + this.hp, e.y) : _p(e.x, e.y)
                return { p1, p2, p3, p4, type }
            }
        }

    }
    getLeftBorder(type: BorderType, startConnection: BorderType, endConnection: BorderType) {
        const off = (connection: BorderType) => connection === 'rama' ? this.hp : 0


        switch (type) {
            case "rama": {
                const [p1, p2] = this.left
                const p3: Point = _p(p2.x + this.hp, p2.y + off(endConnection))
                const p4: Point = _p(p1.x + this.hp, p1.y - off(startConnection))
                return { p1, p2, p3, p4, type }
            }
            case "imp": {
                const [s, e] = this.left
                const p1 = startConnection === 'rama' ? _p(s.x, s.y) : _p(s.x, s.y)
                const p2 = startConnection === 'rama' ? _p(s.x + this.hp / 2, s.y) : _p(s.x + this.hp / 2, s.y)
                const p3 = endConnection === 'rama' ? _p(e.x + this.hp / 2, e.y + this.hp) : _p(e.x + this.hp / 2, e.y)
                const p4 = endConnection === 'rama' ? _p(e.x, e.y + this.hp) : _p(e.x, e.y)
                return { p1, p2, p3, p4, type }
            }
        }

    }

}

export class StvFrame extends BaseFrame {

    constructor(w: number, h: number, pos: Point = _p(0, 0)) {
        super(w, h, pos)
    }


    getTop() {
        const [s, e] = this.top
        const p1 = _p(s.x + this.stv_offset, s.y + this.stv_offset)
        const p2 = _p(s.x + this.stv_offset + this.hp, s.y + this.stv_offset + this.hp)
        const p3 = _p(e.x - (this.stv_offset + this.hp), e.y + (this.stv_offset + this.hp))
        const p4 = _p(e.x - this.stv_offset, e.y + this.stv_offset)
        return { p1, p2, p3, p4 }
    }
    getRight() {
        const [s, e] = this.right
        const p1 = _p(s.x - this.stv_offset, s.y + this.stv_offset)
        const p2 = _p(s.x - (this.stv_offset + this.hp), s.y + this.stv_offset + this.hp)
        const p3 = _p(e.x - (this.stv_offset + this.hp), e.y - (this.stv_offset + this.hp))
        const p4 = _p(e.x - this.stv_offset, e.y - this.stv_offset)
        return { p1, p2, p3, p4 }
    }
    getBottom() {
        const [s, e] = this.bottom
        const p1 = _p(s.x - this.stv_offset, s.y - this.stv_offset)
        const p2 = _p(s.x - (this.stv_offset + this.hp), s.y - (this.stv_offset + this.hp))
        const p3 = _p(e.x + (this.stv_offset + this.hp), e.y - (this.stv_offset + this.hp))
        const p4 = _p(e.x + this.stv_offset, e.y - this.stv_offset)
        return { p1, p2, p3, p4 }
    }
    getLeft() {
        const [s, e] = this.left
        const p1 = _p(s.x + this.stv_offset, s.y - this.stv_offset)
        const p2 = _p(s.x + (this.stv_offset + this.hp), s.y - (this.stv_offset + this.hp))
        const p3 = _p(e.x + (this.stv_offset + this.hp), e.y + (this.stv_offset + this.hp))
        const p4 = _p(e.x + this.stv_offset, e.y + this.stv_offset)
        return { p1, p2, p3, p4 }
    }

    getStv() {
        const top = this.getTop()
        const bottom = this.getBottom()
        const left = this.getLeft()
        const right = this.getRight()
        return { top, right, bottom, left }
    }
}