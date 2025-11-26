import { Prisma } from "@/generated/prisma/client";

const OK1: Prisma.SkladCreateInput = {
    title: "Окно № 1",
    desc: "ВХС 60, 800x500",
    amount: 5,
    img: "preload_sklad/ok1.jpg"
}
const OK2: Prisma.SkladCreateInput = {
    title: "Окно № 2",
    desc: "ВХС 60, 580x610",
    amount: 5,
    img: "preload_sklad/ok2.jpg"
}
const OK3: Prisma.SkladCreateInput = {
    title: "Окно № 3",
    desc: "ВХС 60, 800x1200",
    amount: 5,
    img: "preload_sklad/ok3.jpg"
}
const OK4: Prisma.SkladCreateInput = {
    title: "Окно № 4",
    desc: "ВХС 60, 1170x1000",
    amount: 5,
    img: "preload_sklad/ok4.jpg"
}
const OK5: Prisma.SkladCreateInput = {
    title: "Окно № 5",
    desc: "ВХС 60, 1170x1200",
    amount: 5,
    img: "preload_sklad/ok5.jpg"
}
const OK6: Prisma.SkladCreateInput = {
    title: "Окно № 6",
    desc: "Proline, 1660x1470",
    amount: 5,
    img: "preload_sklad/ok6.jpg"
}
const OK7: Prisma.SkladCreateInput = {
    title: "Окно № 7",
    desc: "Proline, 1360x1470",
    amount: 5,
    img: "preload_sklad/ok7.jpg"
}
const OK8: Prisma.SkladCreateInput = {
    title: "Окно № 8",
    desc: "Proline, 560x1470",
    amount: 5,
    img: "preload_sklad/ok8.jpg"
}
const OK9: Prisma.SkladCreateInput = {
    title: "Окно № 9",
    desc: "Proline, 1170x1470",
    amount: 5,
    img: "preload_sklad/ok9.jpg"
}
const OK10: Prisma.SkladCreateInput = {
    title: "Окно № 10",
    desc: "Proline, 560x570",
    amount: 5,
    img: "preload_sklad/ok10.jpg"
}
const OK11: Prisma.SkladCreateInput = {
    title: "Окно № 11",
    desc: "Proline, 1360x1470",
    amount: 5,
    img: "preload_sklad/ok11.jpg"
}

export const default_sklad = [OK1, OK2, OK3, OK4, OK5, OK6, OK7, OK8, OK9, OK10, OK11]