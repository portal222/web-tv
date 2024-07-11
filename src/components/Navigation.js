import React, { useEffect, useRef } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lime, purple, teal, green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { Routes, Route, NavLink, HashRouter } from 'react-router-dom';
import Home from "./Home";
import SearchMain from "./search/searchMain";
import ResultsTvShow from "./results/ResultsTvShow";
import DetailsTvShow from "./details/DetailsTvShow";
import ShowImg from "./details/ShowImg";
import DetailsActor from "./details/DetailsActor";
import ResultsCelebsNew from "./results/ResultsCelebsNew";
import ResultsTvActors from "./results/ResultsTvActors";

const theme = createTheme({
  palette: {
    primary: green,
    secondary: teal,
  },
});



const Navigation = () => {

  return (

    <>
      <HashRouter
        basename="/">
        <div className="provider">
          <div className="fixed">
            <NavLink to="/">
              <Button variant="contained" sx={{ ml: 2 }}>
                Home</Button >
            </NavLink>
            <NavLink to="/search">
              <Button variant="contained" sx={{ ml: 2 }}>
                Search</Button>
            </NavLink>
          </div>





        </div>



        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchMain />} />
          <Route path="/tvShow" element={<ResultsTvShow />} />
          <Route path="/tvActor" element={<ResultsTvActors />} />
          <Route path="/showDetails/:showId" element={<DetailsTvShow />} />
          <Route path="/imgShow/:images" element={<ShowImg />} />
          <Route path="/actorDetails/:actorId" element={<DetailsActor />} />
        </Routes>

      </HashRouter>

      <div className="footer">
        <hr></hr>
        <p>
          Json base from <a href="https://www.tvmaze.com" target="_blank">TvMaze</a></p>

        &copy; InTerVal
      </div>
    </>
  )
}
export default Navigation;