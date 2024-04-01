import { formatCurrency } from "../helpers";
import { PedidoItemT} from "../types";
import PedidoTotales from "./PedidoTotales";
type PedidoT = {
  pedido: PedidoItemT[];
  removeFromPedido: (item: PedidoItemT["id"]) => void;
  tip:number;
  setTip:React.Dispatch<React.SetStateAction<number>>
};

function Pedido({
  pedido,
  removeFromPedido,
  tip,
  setTip
}: PedidoT) {
  return (
    <div className=" w-full mt-4 shadow-lg text-center p-3  my-3">
      {pedido.map((item: PedidoItemT) => {
        const { name, price } = item;
        return (
          <div className="flex justify-between p-3 items-center border-b-2">
            <div className="flex flex-col items-start">
              <span className="col-span-6 text-left flex flex-col">
                {name} - {formatCurrency(price)}
              </span>
              <span className=" font-bold">
                Cantidad: {item.cantidad} - {formatCurrency(price * item.cantidad)}
              </span>
            </div>
            <button
              className=" bg-teal-900 text-white rounded-full h-6 w-6 text-[0.8rem] col-auto hover:bg-teal-950 duration-100 font-black"
              onClick={() => {
                removeFromPedido(item.id);
              }}
            >
              X
            </button>
          </div>
        );
      })}
      <PedidoTotales pedido={pedido} tip={tip} setTip={setTip}/>
    </div>
  );
}

export default Pedido;
