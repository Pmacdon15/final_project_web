// import logo from './logo.svg';
import './App.css';
import BVCImage from './components/bvc-image/BVCImage.component';
import HomePageMain from './components/home-page/HomePageMain.component';

function App() {
  return (
    <div className="App">
      <header className="">
        <BVCImage />
      </header>
      <HomePageMain />
    </div>
  );
}

export default App;
