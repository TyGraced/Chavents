import axios from "axios";
import { useState } from "react";
import { Button, ButtonGroup, Header, Segment } from "semantic-ui-react";
import ValidationError from "./ValidationErrors";

export default function TestErrors() {
    const baseUrl = import.meta.env.VITE_API_URL + '/api/';
    const [errors, setErrors] = useState(null);

    function handleNotFound() {
        axios.get(baseUrl + 'buggy/not-found').catch(err => console.log(err.response));
    }

    function handleBadRequest() {
        axios.get(baseUrl + 'buggy/bad-request').catch(err => console.log(err.response));
    }

    function handleServerError() {
        axios.get(baseUrl + 'buggy/server-error').catch(err => console.log(err.response));
    }

    function handleUnauthorized() {
        axios.get(baseUrl + 'buggy/unauthorized').catch(err => console.log(err.response));
    }

    function handleBadGuid() {
        axios.get(baseUrl + 'activities/notaguid').catch(err => console.log(err.response));
    }

    function handleValidationError() {
        axios.post(baseUrl + 'activities', {}).catch(err => setErrors(err));
    }

    return (
        <>
            <Header as='h1' content='Test Error component' />
            <Segment>
                <ButtonGroup widths='7'>
                    <Button onClick={handleNotFound} content='Not Found' basic primary />
                    <Button onClick={handleBadRequest} content='Bad Request' basic primary />
                    <Button onClick={handleValidationError} content='Validation Error' basic primary />
                    <Button onClick={handleServerError} content='Server Error' basic primary />
                    <Button onClick={handleUnauthorized} content='Unauthorized' basic primary />
                    <Button onClick={handleBadGuid} content='Bad Guid' basic primary />
                </ButtonGroup>
            </Segment>
            {errors && <ValidationError  errors={errors} />}
        </>
    )
}