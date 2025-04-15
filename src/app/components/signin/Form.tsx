'use client'

import React from "react"
import { useState } from "react";
import NextAuth from "next-auth";
import { SessionTokenError } from "@auth/core/errors";
import { doCredentialLogin } from "@/app/actions";

export default function Form() {
    const [form, setForm] = useState<{
        username: string;
        password: string;
        remember: boolean;
    }>({
        username: '',
        password:'',
        remember: false,
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value, type} = e.target;
        const isChecked = e.target.checked;
        setForm({
            ...form,
            [name] : type === "checkbox" ? isChecked : value
        });
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        try {
            const form = new FormData(e.currentTarget);
            const response = await doCredentialLogin(form);

            if (response?.error) {
                console.error(response.error);
            }


        } catch(error: any) {
            console.error(error);
            
        }




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
                    placeholder='fin@gmail.com'
                    required
                />
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
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
                
                <button type="submit">Sign In</button>
            </form>
        </div>
    )
}