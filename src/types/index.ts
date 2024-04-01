export type MenuItemT={
    "id": number,
    "name": string,
    "price": number
}

export type PedidoItemT=MenuItemT &{
    "cantidad":number
}

export type Tips ={
    id: string,
    value: number,
    label: string
}