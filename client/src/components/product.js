import React, { useEffect, useState } from "react";
import {decodeToken} from 'react-jwt'
import {useNavigate} from 'react-router-dom'

function Product() {
    const navigate = useNavigate();
    const [products, setProducts] = useState("")
    const [tempproduct, setTempproduct] = useState('')
    async function populateProduct(){
        const req = await fetch('http://localhost:8080/product',{
            headers: {
                'x-access-token' : localStorage.getItem('token')
            }
        })
        const data = req.json();
        if(data.status === 'ok'){
            setProducts(data.products)
        }
        else{
            alert(data.error)
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            const user = decodeToken(token)
            if(!user){
                localStorage.removeItem('token');
                navigate("/login", { replace: true });
            }
            else{
                populateProduct()
            }
        }
    },[])

    async function updateProduct(){

    }


    return <div>
        <h1>Products of user : {products || "No products found"}</h1>
        <form onSubmit={updateProduct}>
            <input type="text" placeholder="products" value={tempproduct} setValue={e => setTempproduct(e.target.value)} />
            <input type="submit" value="update Product"/>
        </form>
    </div>
}
export default Product;