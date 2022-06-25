import React from "react";
import { Container } from "react-bootstrap";
import { SVG } from "../utils";


export default function NotFoundPage() {

    return (<>
    <Container className="d-flex flex-column align-items-center justify-content-center">
        <div className="mb-4 not-found">
            <span>4</span>
            {SVG("pokeball", 20, 20)}
            <span>4</span>
        </div>
        <span class="mb-4">Page not found :(</span>
        <div>
            <a href="/">
                <button type="button" class="btn btn-outline-danger">
                    <i class="bi bi-arrow-left"></i> Go back
                </button>
            </a>
        </div>
    </Container>
    
    </>)


}