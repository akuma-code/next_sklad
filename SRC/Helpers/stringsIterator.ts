export class StringsIterator<T extends string> {
    order: T[]
    counter: number = 0
    constructor(...strings: T[]) {
        this.order = strings
    }

    next() {
        const current = this.order[this.counter]
        this.counter++
        if (this.counter === this.order.length + 1) this.counter = 0
        return current
    }
}