import React from "react"
import { useState } from "react";

export default function Form() {
    const [form, setForm] = useState<{
        username: string;
        password: string;
    }>({
        username: '',
        password:''
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value, type} = e.target;
        setForm({
            ...form,
            [name] : value
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
            </form>
        </div>
    )
}