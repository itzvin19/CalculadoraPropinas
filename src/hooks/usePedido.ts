import { useState } from "react"
import { MenuItemT, PedidoItemT } from "../types";


export const usePedido = () => {


    const [pedido, setPedido] = useState<PedidoItemT[]>([]);
    const [tip, setTip] = useState(0);

    function addToPedido(item: MenuItemT) {
        const itemExists = pedido.find(platillo => platillo.id === item.id)
        if (itemExists) {
            const updatedPedido = pedido.map(platillo => itemExists.id === platillo.id ? { ...platillo, cantidad: platillo.cantidad + 1 } : platillo)
            setPedido(updatedPedido);
        } else {
            const newItem: PedidoItemT = { ...item, cantidad: 1 }
            setPedido([...pedido, newItem])
        }
    }

    function removeFromPedido(item: PedidoItemT['id']) {
        setPedido(pedido.filter((e) => e.id !== item))
    }

    return {
        pedido,
        tip,
        setTip,
        addToPedido,
        removeFromPedido
    }

}