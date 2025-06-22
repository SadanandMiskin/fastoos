// import React from 'react'
import CarWikiApp from './components/CarWikiApp.tsx';
import ThreedPage from './components/ThreedCardWrapper.tsx';
import PorscheGallery from './components/PorscheGallery.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage.tsx';
// import { Header } from './components/Header.tsx';
// import useScrollToTop from './Hooks/ScrollToTop.ts';


export const App = () => {

  // useScrollToTop()
  window.scrollTo(0, 0);
  return (
      <>
    <BrowserRouter>
    {/* <Header /> */}
    <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<CarWikiApp />} />
        <Route path='/3d' element={<ThreedPage />} />
        <Route path='/photo' element={<PorscheGallery />} />
    </Routes>
    </BrowserRouter>

      </>
  )
}
