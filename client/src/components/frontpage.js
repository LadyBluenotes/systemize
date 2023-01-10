import React from "react";

export default function FrontPage(){

    return(
        <div className="cover container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
            <div className="d-flex justify-content-center">
                <div className="text-center">
                    <h1 className="text-black mx-auto my-0 text-uppercase">Systemize</h1>
                    <h2 className="text-muted mx-auto mt-2 mb-5">Effortlessly manage your tasks and responsibilities.</h2>
                    <a className="btn btn-primary" href="/signup">Sign Up Today</a>
                </div>
            </div>
        </div>
    )
}