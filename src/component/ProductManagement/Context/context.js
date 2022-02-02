import React, { createContext, useReducer, useState } from 'react';


const initialState = [];
export const ProductDataContext = createContext(initialState)
const ProductReducer = (oldState,action)=>{
  let products;
  switch (action.type) {
    case 'DELETE':
      return products = oldState.filter((item)=>item.id !== action.payload)
    case "ADD":
      products = [action.payload,...oldState]
      return products
    case "UPDATE":
     return oldState.map((item)=> item.id = action.payload.id ? {...item,...action.payload.updatedData}:item)
    default:
      return oldState;
  }

}
export const Provider = ({ children }) => {

  const [reload, setReload] = useState(false)
  const [isDelConfirm, setIsDelConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false)

  const [products, dispatch] = useReducer(ProductReducer, initialState);

  // action creators
  const addProducts = (products)=>{
    dispatch({type:"ADD",payload:products})
  }
  const updateProducts = (id,updatedData)=>{
    dispatch({type:"UPDATE",payload:{id,updatedData}})

  }
  const deleteProducts = (id)=>{
    dispatch({type:"DELETE",payload:id})
  }

 

  return (
    <ProductDataContext.Provider
      value={{
        data:products,
        setReload,
        isDelConfirm,
        setIsDelConfirm,
        showModal,
        setShowModal,
        addProducts,
        deleteProducts,
        updateProducts

      }}
    >
      {children}
    </ProductDataContext.Provider>
  )
}
