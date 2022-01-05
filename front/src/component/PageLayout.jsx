import React from "react";
import Navbar from "./Navbar";

export default function PageLayout({ title, sub, children }) {
    return (
        <div>
            <Navbar />
            <h1>
                <b>{title}</b>
                <p>{sub}</p>
            </h1>

            {children}
        </div>
    );
}
