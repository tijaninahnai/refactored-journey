'use client';
import { useState } from "react";

export default function Chat() {
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false); // State for loading

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true); // Start loading

        const prompt = event.target.elements.exampleFormControlTextarea1.value;
        const data = {
            model: "llama3",
            prompt: prompt,
            stream: false,
        };
        
        console.log('prompt value', prompt);

        fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setResult(data.result);
            setLoading(false); // Stop loading
        })
        .catch((error) => {
            console.error('Error:', error);
            setLoading(false); // Stop loading on error
        });
    };

    return (
        <div className="container-md">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Versturen</button>
            </form>

            {loading && (
                <div className="spinner-border text-danger mt-3" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
            {result && (
                <div className="mt-3">
                    <h3>Result:</h3>
                    <p>{result}</p>
                </div>
            )}
        </div>
    );
}
