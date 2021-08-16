import redux, { combineReducers, createStore } from "redux";

export const CounterRedux = () => {
  return <h1>Counter Redux</h1>;
};
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUT_ICECREAM";

const buyCake = () => {
  return {
    type: BUY_CAKE,
    info: "Firts redux action",
  };
};

const buyIcecream = () => {
  return {
    type: BUY_ICECREAM,
    info: "Firts redux action",
  };
};

const initialIcecreamState = {
  numberOfIcecreams: 20,
};

const initialCakeState = {
  numberOfCakes: 10,
};

const icecreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numberOfIcecreams: state.numberOfIcecreams - 1,
      };
    default:
      return state;
  }
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  icecream: icecreamReducer,
});

const store = createStore(rootReducer);
console.log(store.getState());
const unsubscribe = store.subscribe(() => console.log(store.getState()));
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());
console.log(store.getState().cake.numberOfCakes);
console.log(store.getState().icecream.numberOfIcecreams);
unsubscribe();
