import { Dispatch } from "react";
import { formatCurrency } from "../helpers";
import { MenuItemT } from "../types";
import { PedidoActions } from "../reducers/Pedido-reducer";
type MenuItemProps = {
  item: MenuItemT;
  dispatch: Dispatch<PedidoActions>
};

export default function MenuItem({ item, dispatch }: MenuItemProps) {
  const { name, price } = item;
  return (
    <div
      className="py-2 px-7 flex justify-between cursor-default duration-75 hover:bg-teal-500 hover:text-white"
      onClick={() => {
        dispatch({ type: 'add-to-pedido', payload: { item } })
      }}
    >
      <span>{name}</span>
      <span>{formatCurrency(price)}</span>
    </div>
  );
}
