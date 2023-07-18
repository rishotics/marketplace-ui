import React, { useState } from 'react';

const Prompt = () => {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(prompt);
        // Add your action for the prompt here
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Prompt:
                <input type="text" value={prompt} onChange={e => setPrompt(e.target.value)} />
            </label>
            <input type="submit" value="Enter" />
        </form>
    );
};

export default Prompt;
