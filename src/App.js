import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from './diseases/pages/Create/Create';
import Feed from './diseases/pages/Feed/Feed';
import Header from './shared/components/Header/Header';
import Symptoms from './diseases/pages/Symptoms/Symptoms';  

import StrokeQuestions from './diseases/pages/Questions/Stroke';
import MalariaQuestions from './diseases/pages/Questions/Malaria';
import CoronavirusQuestions from './diseases/pages/Questions/Coronavirus';
import DiabetesQuestions from './diseases/pages/Questions/Diabetes';
import RespiratoryQuestions from './diseases/pages/Questions/Respiratory';



function App() {
  return (
    <BrowserRouter>
      <Header showAddBtn={false} /> 
      <Routes>
        <Route exact path='/' element={<Feed />} />
        <Route exact path='/create' element={<Create />} />
        <Route exact path='/symptoms' element={<Symptoms />} /> 
        <Route exact path="/questions/stroke" element={<StrokeQuestions />} /> 
        <Route exact path="/questions/corona" element={<CoronavirusQuestions />} />  
        <Route exact path="/questions/malaria" element={<MalariaQuestions />} /> 
        <Route exact path="/questions/diabetes" element={<DiabetesQuestions />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App;
