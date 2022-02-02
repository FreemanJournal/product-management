import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { ProductDataContext } from './Context/context'
import StoreUnitHandler from './CustomFunction/StoreUnitHandler'
import UnitName from './CustomFunction/UnitName'
import UpdateModal from './Update/UpdateModal'


export default function Product() {
  const { data, setReload,showModal,setShowModal, isDelConfirm,deleteProducts} = useContext(ProductDataContext)
  const [isUpdate, setIsUpdate] = useState(false);
const [deleteId, setDeleteId] = useState();


  const deleteHandler = (id) => {
    setIsUpdate(false)
    setShowModal(true)
    setDeleteId(id)
  }
  useEffect(()=>{
    deleteProducts(deleteId)
    setReload((prevState) => !prevState)
  },[isDelConfirm,setReload])

  
  const [Up, setUp] = useState(0)
  const onUpdateHandler = (id) => {
    setIsUpdate(true)
    setShowModal(true)
    setUp(id)
  }

  return (
    <>
      <div className="">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th scope="col" className="table_head">
                Date of Purchase
              </th>
              <th scope="col" className="table_head">
                Product
              </th>
              <th scope="col" className="table_head">
                Unit of Purchase
              </th>
              <th scope="col" className="table_head">
                Unit Price
              </th>
              <th scope="col" className="table_head">
                Total Cost
              </th>
              <th scope="col" className="table_head">
                Store Unit
              </th>
              <th scope="col" className="table_head">
                { }
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => {
                const {
                  id,
                  createdAt,
                  productName,
                  productInputUnit,
                  productQuantity,
                  productInputUnitPrice,
                  productOutPutUnit,
                } = item

                return (
                  <tr key={index}>
                    <td className="px-5  border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <p>{moment(createdAt).format('DD/MM/YYYY')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {productName}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {productQuantity.toLocaleString()}{' '}
                        {UnitName(productInputUnit)}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">
                          {productInputUnitPrice.toLocaleString()}
                        </span>
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        ${' '}
                        {(
                          productQuantity * productInputUnitPrice
                        ).toLocaleString()}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <StoreUnitHandler
                        quantity={productQuantity}
                        inputUnit={productInputUnit}
                        outputUnit={productOutPutUnit}
                        givenUnit={UnitName}
                      />
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-indigo-600 hover:text-indigo-900">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-green-200  opacity-50 rounded-sm"
                          ></span>
                          <span
                            className="relative cursor-pointer"
                            onClick={() => onUpdateHandler(id)}
                          >
                            Edit
                          </span>
                        </span>
                        {" "}
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-green-200   opacity-50 rounded-sm"
                          ></span>
                          <span
                            className="relative cursor-pointer "
                            onClick={() => deleteHandler(id)}
                          >
                            Delete
                          </span>
                        </span>
                      </p>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>

      </div>
      {showModal ? (
        <UpdateModal
          showModal={showModal}
          setShowModal={setShowModal}
          setReload={setReload}
          updateId={Up}
          data={data}
          isUpdate={isUpdate}
        />
      ) : (
        ''
      )}
    </>
  )
}
