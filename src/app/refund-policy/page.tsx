import React from 'react'
import RefundPolicyPage from './component/RefundPolicy'
import Header from '../components/navigation/Header'
import { Footer } from '../components/navigation/Footer'

type Props = {}

const Page = (props: Props) => {
  return (
    <div>
        <Header/>
        <RefundPolicyPage/>
        <Footer/>
    </div>
  )
}

export default Page