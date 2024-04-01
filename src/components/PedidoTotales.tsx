import { formatCurrency } from "../helpers";
import { PedidoItemT} from "../types";
import { useMemo } from "react";
import { tipOptions } from "../data/db";

type PedidoTotalesProps = {
  pedido: PedidoItemT[];
  tip:number
  setTip:React.Dispatch<React.SetStateAction<number>>
};

function PedidoTotales({ pedido ,tip,setTip}: PedidoTotalesProps) {
  const subTotalAmount = useMemo(
    () => pedido.reduce((total, item) => total + item.cantidad * item.price, 0),
    [pedido]
  );

  const tipsAmount = useMemo(() => subTotalAmount * tip, [tip,pedido]);

  const totalAmount = useMemo(
    () => tipsAmount+subTotalAmount,
    [pedido,tip]
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
                <input type="radio" name="tips" value={item.value} onChange={(e)=>{setTip(+e.target.value)}}></input>
              </div>
            ))}
          </form>
        </div>
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
      </div>
      <button
        className="col-span-11 bg-teal-900 text-white uppercase duration-100 hover:bg-teal-950
      p-3"
      >
        Registrar Pedido
      </button>
    </>
  );
}

export default PedidoTotales;
