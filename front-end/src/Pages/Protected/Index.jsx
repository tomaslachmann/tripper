import HomePage from "./Home/Home";

import { Routes, Route } from 'react-router';

import Grid from "../../components/Protected/Grid/Grid";
import Header from "../../components/Protected/Header/Header";
import TripChoose from "../../components/Protected/TripChoose/TripChoose";
import TripCreate from "../../components/Protected/TripCreate/TripCreate";
import TripSearch from "../../components/Protected/TripSearch/TripSeach";
import Friends from "../../components/Protected/Friends/Friends";


function ProtectedIndex() {
  return (
    <div className="App">
      <Header />
      <Grid>
        <Routes>
          <Route path="/home" element={<HomePage/>} />
          <Route path="/trips" element={ <TripChoose />} />
          <Route path="/trips/create" element={ <TripCreate /> } />
          <Route path="/trips/search" element={ <TripSearch /> } />    
          <Route path="/friends" element={ <Friends /> } />       
        </Routes>
      </Grid>
    </div>
  );
}

export default ProtectedIndex;
