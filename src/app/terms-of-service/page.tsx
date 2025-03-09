import React from 'react'
import TermsOfServicePage from './componet/TermsOfService'
import Header from '../components/navigation/Header'
import { Footer } from '../components/navigation/Footer'

type Props = {}

const Page = (props: Props) => {
  return (
    <div>
        <Header/>
        <TermsOfServicePage/>
        <Footer/>
    </div>
  )
}

export default Page