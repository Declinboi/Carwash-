import React from 'react'
import ProductsPage from './component/ProductPage'
import Header from '../components/navigation/Header'

type Props = {}

const Page = (props: Props) => {
  return (
    <div>
        <Header/>
        <ProductsPage/>
    </div>
  )
}

export default Page