import React, { useContext, useState } from 'react'
import { ProductDataContext } from '../Context/context'
import UnitValue from '../CustomFunction/UnitValue'
import {v4 as uuidV4} from 'uuid'



const initialState = {
  productName: '',
  productQuantity: 0,
  productInputUnit: '',
  productInputUnitPrice: 0,
  productOutPutUnit: '',
  createdAt:0,
  id:0
}

export default function SendProductInfo({
  dataReload,
  submitTitle,
  setShowModal,
}) {
  const { addProducts } = useContext(ProductDataContext)
  const [difKey, setDifKey] = useState(0)

  const [productData, setProductData] = useState(initialState)

  const onChangeHandler = ({ target: { name, value } }) => { setProductData({ ...productData, [name]: UnitValue(value) }) }


  let {
    productName,
    productQuantity,
    productInputUnit,
    productInputUnitPrice,
    productOutPutUnit,
  } = productData
  const createProduct = () => {
    if (
      !productName ||
      !productQuantity ||
      productQuantity < 0 ||
      !productInputUnit ||
      !productInputUnitPrice ||
      !productOutPutUnit
    )
      return

    

    addProducts({...productData,createdAt:new Date(),id:uuidV4()})
    dataReload((res) => !res)
    setDifKey(Math.random())
    // setShowModal((prevState) => !prevState)
  

    setProductData(initialState);

  }


  return (
    <div key={difKey}>
      <div className="flex flex-col mb-5">
        <form className="w-full">
          <div className=" flex flex-wrap space-x-2">
            <fieldset className="input_secondary">
              <legend>Select Product:</legend>
              <select
                className="input_primary"
                placeholder="name"
                defaultValue={'DEFAULT'}
                name='productName'
                onChange={onChangeHandler}
              >
                <option value="DEFAULT" disabled hidden>
                  Product
                </option>
                <option value="Rice">Rice</option>
                <option value="Sugar">Sugar</option>
                <option value="Salt">Salt</option>
                <option value="Onion">Onion</option>
              </select>
            </fieldset>
            <fieldset className="input_secondary">
              <legend>Enter Quantity:</legend>
              <input
                type="number"
                className="input_primary"
                placeholder="Quantity"
                name='productQuantity'
                onChange={onChangeHandler}
              />
            </fieldset>
            <fieldset className="input_secondary">
              <legend>Enter Unit Price:</legend>
              <input
                type="number"
                className="input_primary"
                placeholder="Unit Price"
                name='productInputUnitPrice'
                onChange={onChangeHandler}
              />
            </fieldset>
            <fieldset className="input_secondary">
              <legend>Enter Buying Unit:</legend>
              <select
                className="input_primary"
                placeholder="name"
                defaultValue={'DEFAULT'}
                name='productInputUnit'
                onChange={onChangeHandler}
              >
                <option value="DEFAULT" disabled hidden>
                  Unit
                </option>
                <option value="gram">Gram</option>
                <option value="kg">Kg</option>
                <option value="packet">Packet(5kg)</option>
                <option value="bag">Bag(25kg)</option>
                <option value="sack">Sack(40kg)</option>
                <option value="ton">Ton(100kg)</option>
              </select>
            </fieldset>
            <fieldset className="input_secondary">
              <legend>Enter Store Unit:</legend>
              <select
                className="input_primary"
                placeholder="name"
                defaultValue={'DEFAULT'}
                name='productOutPutUnit'
                onChange={onChangeHandler}
              >
                <option value="DEFAULT" disabled hidden>
                  Unit
                </option>
                <option value="gram">Gram</option>
                <option value="kg">Kg</option>
                <option value="packet">Packet(5kg)</option>
                <option value="bag">Bag(25kg)</option>
                <option value="sack">Sack(40kg)</option>
                <option value="ton">Ton(100kg)</option>
              </select>
            </fieldset>
          </div>
        </form>
        <div className="flex gap-4">
          <button
            className="button_primary"
            type="submit"
            onClick={createProduct}
          >
            {submitTitle}
          </button>
        </div>
      </div>
    </div>
  )
}
