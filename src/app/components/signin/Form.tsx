'use client'

import React from "react"
import { useState } from "react";
import NextAuth from "next-auth";
import { SessionTokenError } from "@auth/core/errors";
import { doCredentialLogin } from "@/app/actions";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Form() {
    const [error, setError] = useState('');

    const router = useRouter();

    const [form, setForm] = useState<{
        email: string;
        password: string;
        remember: boolean;
    }>({
        email: '',
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
        const formData = new FormData(e.currentTarget);
        const response = doCredentialLogin(formData);

        if (!(await response).success) {
            setError((await response).error || "Invalid login");
            return;
        }
    
        const result = await signIn("credentials", {
            email: form.email,
            password: form.password,
            redirect: false,
        });
    
        if (result?.error) {
            setError("Login failed");
        } else {
            router.push("/transactionhistory");
        }

        /*
        try {
            const form = new FormData(e.currentTarget);
            const response = await doCredentialLogin(form);

            if (response?.error) {
                alert(response.error);
            } else {
                console.log("Logged In");
                router.push("/transactionhistory");
            }

        } catch(error: any) {
            console.error(error);
            setError("Check your Credentials");
            
        }
        */
        // Handle signin here
        console.log("Form Submitted:H ", form);
    }
    
    
    return (
        <div>
            {error && <p className="text-red-500"> {error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    name="email"
                    value={form.email}
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