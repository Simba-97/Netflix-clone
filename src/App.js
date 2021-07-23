import './App.css';
import Row from './components/Row';
import requests from './request';
import Banner from './components/Banner';

function App() {
  return (
    <div className="App">
      <Banner/>
      <Row title="NETFLIX ORIGINALS" fetchURL={requests.fetchNetflixOriginals} isLargeRow={true}/>
      <Row title="Trending now" fetchURL={requests.fetchTrending}/>
      <Row title="Top Rated" fetchURL={requests.fetchTopRated}/>
      <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies}/>
      <Row title="Action Movies" fetchURL={requests.fetchActionMovies}/>
      <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies}/>    
    </div>
  );
}

export default App;
