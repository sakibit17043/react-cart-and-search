import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import {addToDb, getStoredCart} from '../../utilities/fakedb';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect( () =>{
        // console.log('before products added')
        fetch('products.json')
        .then(res=> res.json())
        .then(data => setProducts(data))
    }, []);
    useEffect(()=>{
        const storedCart = getStoredCart();
        const savedCart = [];
        // console.log(products)
        for(const id in storedCart){
            
            const addedProduct = products.find(product => product.id ===id);
            // console.log(addedProduct.quantity)

            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);

            }
        }
        setCart(savedCart);
    
    
    },[products])
    

    const handleAddToCart = (selectProduct) =>{
        // console.log(product);
        // do not do this: cart.push(product);
        let newCart = [];
        const exists = cart.find(product =>product.id === selectProduct.id);
        if(!exists){
            selectProduct.quantity = 1;
            newCart = [...cart,selectProduct];
        }
        else{
            const rest = cart.filter(product => product.id !== selectProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
         
        setCart(newCart);
        addToDb(selectProduct.id);
        
        
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product=><Product 
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                        ></Product>)
                }
            </div>
            <div className="cart-container">
               <Cart
               cart={cart}
               
               ></Cart>
            </div>
        </div>
    );
};

export default Shop;