import React from 'react'
import FAQPage from './component/FAQ'
import Header from '../components/navigation/Header'
import { Footer } from '../components/navigation/Footer'

type Props = {}

const Page = (props: Props) => {
  return (
    <div>
      <Header/>
        <FAQPage/>
        <Footer/>
    </div>
  )
}

export default Page