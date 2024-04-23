import { MenuItemT, PedidoItemT } from "../types"

export type PedidoActions =
    { type: 'add-to-pedido', payload: { item: MenuItemT } } |
    { type: 'remove-from-pedido', payload: { id: MenuItemT['id'] } } |
    { type: 'add-tip', payload: { tip: number } } |
    { type: 'place-order' }

export type PedidoState = {
    pedido: PedidoItemT[],
    tip: number
}

export const initialState: PedidoState = {
    pedido: [],
    tip: 0
}

export const PedidoReducer = ((state: PedidoState, actions: PedidoActions) => {
    if (actions.type === 'add-to-pedido') {
        const itemExists = state.pedido.find(platillo => platillo.id === actions.payload.item.id)
        if (itemExists) {
            const updatedPedido = state.pedido.map(platillo => itemExists.id === platillo.id ? { ...platillo, cantidad: platillo.cantidad + 1 } : platillo)
            return { ...state, pedido: updatedPedido }
        } else {
            const newItem: PedidoItemT = { ...actions.payload.item, cantidad: 1 }
            return { ...state, pedido: [...state.pedido, newItem] }
        }
    }

    if (actions.type === 'remove-from-pedido') {
        const item = state.pedido.find(e => e.id === actions.payload.id);
        const itemQuantity = item ? item.cantidad : 0;

        if (itemQuantity > 1) {
            const pedidoUpdated = state.pedido.map(e => e.id === actions.payload.id ? { ...e, cantidad: e.cantidad - 1 } : e)
            return { ...state, pedido: pedidoUpdated }
        } else {
            const pedidoUpdated = state.pedido.filter((e) => e.id !== actions.payload.id)
            return { ...state, pedido: pedidoUpdated }
        }
    }

    if (actions.type === 'add-tip') {
        return { ...state, tip: actions.payload.tip }
    }

    if (actions.type === 'place-order') {
        return {
            pedido: [],
            tip: 0
        }
    }

    return state;
})