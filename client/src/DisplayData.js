import React, { useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { ListGroup, Button, InputGroup, FormControl, Alert } from 'react-bootstrap';



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
        <div class="row row--height d-flex align-content-center justify-content-center">
           <div class="col-lg-6">
            <div class="search-country">
                <h2>Search Country</h2>
                    <InputGroup class="mb-3"
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
                        }}>Search
                        </Button>
                    </InputGroup>
                    <div class="row mt-2">
                        <div class="col-lg-3">
                            <p class="fs-6">Popular Search</p>
                        </div>
                        <div class="col-lg-9">
                            <span class="me-1 badge bg-secondary">PH</span>
                            <span class="me-1 badge bg-secondary">US</span>
                            <span class="me-1 badge bg-secondary">SA</span>
                        </div>
                    </div>
                    <div class="country-data">
                        {countrySearchData && (
                        <div>
                            <ListGroup variant="flush">
                                <ListGroup.Item><b>Code:</b> {countrySearchData.country.code}</ListGroup.Item>
                                <ListGroup.Item><b>Name:</b> {countrySearchData.country.name}</ListGroup.Item>
                                <ListGroup.Item><b>Native:</b> {countrySearchData.country.native}</ListGroup.Item>
                                <ListGroup.Item><b>Phone:</b> {countrySearchData.country.phone}</ListGroup.Item>
                                <ListGroup.Item><b>Capital:</b> {countrySearchData.country.capital}</ListGroup.Item>
                                <ListGroup.Item><b>Currency:</b> {countrySearchData.country.currency}</ListGroup.Item>
                                <ListGroup.Item><b>Emoji:</b> {countrySearchData.country.emoji}</ListGroup.Item>
                            </ListGroup>
                        </div>
                        )}
                        {countryError &&
                            <Alert variant="danger">
                                 There was an error fetching the data
                            </Alert>
                        }
                        {countryLoading &&
                            <Alert variant="success">
                                 Your data is loading....
                            </Alert>
                        }
                    </div>
                </div>
           </div>
        </div>
    )
}

export default DisplayData