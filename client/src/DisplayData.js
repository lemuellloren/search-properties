import React from "react";
import { useQuery, gql } from "@apollo/client";


const QUERY_ALL_COUNTRIES = gql `
    query getAllCountry {
            countries {
              code
              name
              capital
              currency
            }
    }
`

function DisplayData() {
    const {data, loading, error} = useQuery(QUERY_ALL_COUNTRIES);
    if(loading) {
        return <h2>Data is Loading .....</h2>
    }
    if(error) {
        return <h2>Something went wrong!</h2>
    }
    return (
        <div>
            <h2>List of countries</h2>
            {data && data.countries.map((countries) => {
                return (
                  <div key={countries.code}>
                    <p>Code: {countries.code}</p>
                    <p>Name: {countries.name}</p>
                    <p>Capital: {countries.capital}</p>
                    <p>Currency: {countries.currency}</p>
                  </div>
                )
            })}
        </div>
    )
}

export default DisplayData