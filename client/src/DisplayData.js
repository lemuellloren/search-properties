import React, { useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { ListGroup, Button, InputGroup, FormControl  } from 'react-bootstrap';



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
            capital
            currency
            emoji
        }
    }
`
function DisplayData() {
    const [countrySearch, setCountrySearched]= useState("");
    const { data, loading, error } = useQuery(QUERY_ALL_COUNTRIES);
    const [fetchCountry, 
        { data: countrySearchData , loading: countryLoading, error: countryError },
    ] = useLazyQuery(GET_COUNTRY_BY_NAME);

    return (
        <div>
            <div className="search-country">
            <h2>Search Country</h2>
                <InputGroup className="mb-3"
                    onChange={(event) => {
                        setCountrySearched(event.target.value.toUpperCase());
                    }}>
                    <FormControl
                        placeholder="Search Country by Code"
                        aria-label="Search Country by Code"
                        />
                    <Button variant="primary" id="button-addon2"
                    onClick={() => {
                        fetchCountry({
                        variables: {
                            code: countrySearch,
                        },
                        });
                    }}>Button
                    </Button>
                </InputGroup>
                <div className="country-data">
                    {countrySearchData && (
                    <div>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Code: {countrySearchData.country.code}</ListGroup.Item>
                            <ListGroup.Item>Name: {countrySearchData.country.name}</ListGroup.Item>
                            <ListGroup.Item>Native: {countrySearchData.country.native}</ListGroup.Item>
                            <ListGroup.Item>Phone: {countrySearchData.country.phone}</ListGroup.Item>
                            <ListGroup.Item>Capital: {countrySearchData.country.capital}</ListGroup.Item>
                            <ListGroup.Item>Currency: {countrySearchData.country.currency}</ListGroup.Item>
                            <ListGroup.Item>Emoji: {countrySearchData.country.emoji}</ListGroup.Item>
                        </ListGroup>
                    </div>
                    )}
                    {countryError && <h2> There was an error fetching the data</h2>}
                    {countryLoading && <h2>DATA IS LOADING...</h2>}
                </div>
            </div>
        </div>
    )
}

export default DisplayData