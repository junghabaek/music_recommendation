import React from "react";
import Navbar from "./Navbar";

export default function PageLayout({ title, sub, children }) {
    return (
        <div>
            <div>
                <h1>{title}</h1>
                <p>{sub}</p>
            </div>

            {children}
        </div>
    );
}
