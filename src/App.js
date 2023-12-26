import './App.css';

const App = () => (
  <div>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/about" element={<About />}></Route>
    </Routes>
  </div>
)

export default App;
