'use client'

import React from "react"
import { useState } from "react";

export default function Form() {
    const [form, setForm] = useState<{
        username: string;
        password: string;
        remember: boolean;
    }>({
        username: 'fin@gmail.com',
        password:'Password',
        remember: false
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value, type} = e.target;
        const isChecked = e.target.checked;
        setForm({
            ...form,
            [name] : type === "checkbox" ? isChecked : value
        })
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Handle signin here
        console.log("Form Submitted: ", form);
    }
    
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                />
                <div className="flex-row m-2 p-2">
                    <input
                        type="checkbox"
                        name="remember"
                        checked={form.remember}
                        onChange={handleChange}
                        className="p-2"
                    />
                    <label htmlFor="remember" className="p-2 !bg-gray-100">Keep me logged in</label>
                </div>
            </form>
        </div>
    )
}