import { useReducer } from "react";
import MenuItem from "./components/MenuItem";
import Pedido from "./components/Pedido";
import { menuItems } from "./data/db";
import { PedidoReducer, initialState } from "./reducers/Pedido-reducer";

function App() {
  const [state,dispatch]=useReducer(PedidoReducer,initialState)
  return (
    <>
      <header className="bg-teal-400 py-5 shadow-lg">
        <h1 className="text-center text-4xl font-black text-gray-100 ">
          Calculadora de Propinas y Consumo
        </h1>
      </header>

      <main className="max-w-6xl mx-auto mt-3 py-3 grid md:grid-cols-2">
        <div>
          <h2 className="text-teal-500 font-black text-2xl">Menu</h2>
          <div className=" border border-teal-500 rounded-md w-5/6 mt-4 shadow-lg max-h-96 overflow-auto">
            {menuItems.map((item) => (
              <MenuItem key={item.id} item={item} dispatch={dispatch} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-center text-xl font-black">Consumo</h2>
          {state.pedido.length > 0 ? (
            <Pedido
              state={state}
              dispatch={dispatch}
            ></Pedido>
          ) : (
            <div className=" w-full mt-4 shadow-lg bg-gray-200 p-44 text-center">
              <span className="uppercase">
                Haga click en el Menú para añadir platillos
              </span>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
