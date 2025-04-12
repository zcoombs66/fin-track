"use client"

import Form from "./Form"
export default function Signin() {
    return (
        <div>
            <h1>Sign in</h1>
            <h2>Please login to continue to your account</h2>
            <Form />
            <label htmlFor="remember">keep me logged in</label>
            <input type="checkbox" />
        </div>
    )
}