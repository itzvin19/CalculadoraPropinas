import { formatCurrency } from "../helpers";
import { MenuItemT } from "../types";
type MenuItemProps = {
  item: MenuItemT;
  addToPedido: (item:MenuItemT)=>void;
};

export default function MenuItem({ item, addToPedido }: MenuItemProps) {
  const { name, price } = item;
  return (
    <div
      className="py-2 px-7 flex justify-between cursor-default duration-75 hover:bg-teal-500 hover:text-white"
      onClick={() => {
        addToPedido(item)
      }}
    >
      <span>{name}</span>
      <span>{formatCurrency(price)}</span>
    </div>
  );
}
