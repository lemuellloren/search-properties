import React, { useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";


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
const GET_COUNTRY_BY_NAME = gql`
    query Country($code: ID!) {
        country(code: $code) {
            code
            name
            native
            phone
        }
    }
`
function DisplayData() {
    const [countrySearch, setCountrySearched]= useState("");
    const { data, loading, error } = useQuery(QUERY_ALL_COUNTRIES);
    const [fetchCountry, 
        { data: countrySearchData , error: countryError },
    ] = useLazyQuery(GET_COUNTRY_BY_NAME);

    return (
        <div>
            <div className="search-country">
            <h2>Search Country</h2>
                <input type="text" placeholder="Search Country by Code" onChange={(event) => {
                    setCountrySearched(event.target.value);
                    }}
                    />
                <button
                    onClick={() => {
                        fetchCountry({
                        variables: {
                            code: countrySearch,
                        },
                        });
                    }}
                    >
                    Search Country
                </button>
                <div className="country-data">
                    {countrySearchData && (
                    <div>
                        <p>Code: {countrySearchData.country.code}</p>
                        <p>Name: {countrySearchData.country.name}</p>
                        <p>Native: {countrySearchData.country.native}</p>
                        <p>Phone: {countrySearchData.country.phone}</p>
                    </div>
                    )}
                    {countryError && <h2> There was an error fetching the data</h2>}
                </div>
            </div>
        </div>
    )
}

export default DisplayData