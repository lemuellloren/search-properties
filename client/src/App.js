import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery
} from "@apollo/client";
import DisplayData from './DisplayData';

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://countries.trevorblades.com/'
  })
  return (
    <ApolloProvider client={client}>
        <div className="App">
            <DisplayData/>
        </div>
    </ApolloProvider>
 
  );
}

export default App;
