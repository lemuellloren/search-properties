import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://countries.trevorblades.com/'
  })
  return (
    <ApolloProvider>
        <div className="App">
            Hello World!
        </div>
    </ApolloProvider>
 
  );
}

export default App;
