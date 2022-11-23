import './App.css';
import Coin from './components/Coin'
import {useEffect, useState} from 'react'
import Axios from 'axios'

function App() {

  const [listOfCoins, setListOfCoins] = useState([]); 
  const [searchWord, setSearchWord] = useState("");

  useEffect(() =>{
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then((response) => {
      setListOfCoins(response.data.coins);
    });
  }, []);

  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  });
  return (
    <div className="App">
      <div className="cryptoHeader">
      <h1>CRYPTO TRACKER</h1>
        <input
          type="text"
          placeholder="Search Currency Here... "
          onChange={(event) => {
            setSearchWord(event.target.value);
          }}
        />
      </div>
      <div className="cryptoDisplay">
        {filteredCoins.map((coin) => {
          return (
            <Coin
              name={coin.name}
              icon={coin.icon}
              price={coin.price}
              symbol={coin.symbol}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
