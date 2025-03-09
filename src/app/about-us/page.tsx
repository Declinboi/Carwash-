import React from 'react'
import Header from '../components/navigation/Header'
import AboutUs from './component/AboutUs'
import { Footer } from '../components/navigation/Footer'

type Props = {}

const Page = (props: Props) => {
  return (
    <div>
        <Header/>
        <AboutUs/>
        <Footer/>
    </div>
  )
}

export default Page