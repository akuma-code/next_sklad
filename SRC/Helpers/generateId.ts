import { v4 } from "uuid";

export const _ID = () => v4().slice(0, 4)
export const _UUID = () => v4()