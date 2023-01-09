import React from "react";
import { Link } from "react-router-dom";

export default function FrontPage(){

    return(
        <div class="cover container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
            <div class="d-flex justify-content-center">
                <div class="text-center">
                    <h1 class="text-black mx-auto my-0 text-uppercase">Systemize</h1>
                    <h2 class="text-muted mx-auto mt-2 mb-5">Effortlessly manage your tasks and responsibilities.</h2>
                    <a class="btn btn-primary" href="/signup">Sign Up Today</a>
                </div>
            </div>
        </div>
    )
}