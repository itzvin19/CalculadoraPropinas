import { formatCurrency } from "../helpers";
import { Dispatch, useMemo } from "react";
import { tipOptions } from "../data/db";
import { PedidoActions, PedidoState } from "../reducers/Pedido-reducer";

type PedidoTotalesProps = {
  state: PedidoState;
  dispatch: Dispatch<PedidoActions>
};

function PedidoTotales({ state, dispatch }: PedidoTotalesProps) {
  const subTotalAmount = useMemo(
    () => state.pedido.reduce((total, item) => total + item.cantidad * item.price, 0),
    [state.pedido]
  );

  const tipsAmount = useMemo(() => subTotalAmount * state.tip, [state.tip, state.pedido]);

  const totalAmount = useMemo(
    () => tipsAmount + subTotalAmount,
    [state.pedido, state.tip]
  );

  return (
    <>
      <div className="flex col-span-11 justify-around">
        <div className="w-1/5">
          <span className="font-bold">Propina:</span>
          <form>
            {tipOptions.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.label}</span>
                <input type="radio" name="tips" value={item.value} onChange={(e) => { dispatch({ type: 'add-tip', payload: { tip: +e.target.value } }) }}></input>
              </div>
            ))}
          </form>
        </div >
        <div className="flex flex-col items-center justify-center">
          <div>
            <span className="font-bold">Subtotal: </span>
            <span>{formatCurrency(subTotalAmount)}</span>
          </div>
          <div>
            <span className="font-bold">Propina: </span>
            <span>{formatCurrency(tipsAmount)}</span>
          </div>
          <div>
            <span className="font-bold">Total a pagar: </span>
            <span>{formatCurrency(totalAmount)}</span>
          </div>
        </div>
      </div >
      <button
        className="col-span-11 bg-teal-900 text-white uppercase duration-100 hover:bg-teal-950
      p-3" onClick={() => {
          dispatch({ type: 'place-order' })
        }}
      >
        Registrar Pedido
      </button>
    </>
  );
}

export default PedidoTotales;
