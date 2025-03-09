import React from 'react'
import Header from '../components/navigation/Header'
import ContactPage from './component/ContactPage'
import { Footer } from '../components/navigation/Footer'

type Props = {}

const Page = (props: Props) => {
  return (
    <div>
        <Header/>
        <ContactPage/>
        <Footer/>
    </div>
  )
}

export default Page