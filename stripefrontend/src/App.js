import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from "react-stripe-checkout"

function App() {
const [product, setProduct] = useState({
  name: "React product by fb",
  price: 100,
  productBY: "fb"
});

  const makePayment = token =>{
      const body={
        token,
        product
      }
      const headers = {
        "Content-Type": "Application/json"
      }
      return fetch(`http://localhost:8282/payment`,{
        method:"POST",
        headers,
        body: JSON.stringify(body)
      }).then(response => {
        console.log("RESPONSE", response)
        const {status} = response;
        console.log("STATUS", status)
      })
      .catch(error => console.log(error))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout stripeKey = "pk_test_51H58mlHlWzMPlMkJ1ZxtFyctmq32FAgIu4obn5Pg1JVOgDpbOvSwvypSpJJy5hd9E0LFsqNadsevelMVbWkGGByG00UEgaBd6p"
        token ={makePayment}
        name = "Buy React" 
        amount={product.price * 100}
         >
        <button className="btn-large red"> React at just {product.price} $</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
