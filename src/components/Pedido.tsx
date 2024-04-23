import { Dispatch } from "react";
import { formatCurrency } from "../helpers";
import { PedidoActions, PedidoState } from "../reducers/Pedido-reducer";
import { PedidoItemT} from "../types";
import PedidoTotales from "./PedidoTotales";
type PedidoT = {
  state: PedidoState;
  dispatch: Dispatch<PedidoActions>;
};

function Pedido({
  state,
  dispatch
}: PedidoT) {
  return (
    <div className=" w-full mt-4 shadow-lg text-center p-3  my-3">
      {state.pedido.map((item: PedidoItemT) => {
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
                dispatch({type:'remove-from-pedido',payload:{id:item.id}});
              }}
            >
              X
            </button>
          </div>
        );
      })}
      <PedidoTotales state={state} dispatch={dispatch}/>
    </div>
  );
}

export default Pedido;
