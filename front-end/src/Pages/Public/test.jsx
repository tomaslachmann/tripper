import HomePage from "./Home/Home";
import { Routes, Route } from 'react-router';

function PublicIndex() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/trips" element={<HomePage/>} />
      </Routes>
    </div>
  );
}

export default PublicIndex;
