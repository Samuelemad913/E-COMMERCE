import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import { QueryClient, QueryClientProvider } from "react-query"
import TokenContextprovider from './Context/Token';
import CartContextProvider from './Context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

let query = new QueryClient()
root.render(
    <CartContextProvider>

        <QueryClientProvider client={query}>
            <TokenContextprovider>
                <App />
            </TokenContextprovider>
        </QueryClientProvider>

    </CartContextProvider>


);

