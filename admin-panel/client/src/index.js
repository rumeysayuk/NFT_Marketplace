import {createRoot} from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux"
import {store} from "./redux/store";
import "./index.css"
import 'react-toastify/dist/ReactToastify.css';
import "antd/dist/antd.css";
import {ContextProvider} from "./contexts/ContextProvider";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
   <Provider store={store}>
      <ContextProvider><App tab="home"/></ContextProvider>
   </Provider>);