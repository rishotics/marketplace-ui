import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import './prompt.css';
import { fileSave } from 'browser-fs-access';

const Prompt = () => {
    const [prompt, setPrompt] = useState('');
    const [image, setImage] = useState('');

    const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(event.target.value);
    };

    const handleEnter = async () => {
      // Create a JSON object from the prompt
      const jsonObject = { prompt };

      // Send a POST request to your server
      try {
          const response = await fetch('http://your-server-url.com/api-endpoint', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(jsonObject)
          });

          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          // Get the JSON data from the response
          const data = await response.json();

          // Let's assume the received base64 image data is in a field named 'image' in the data
          // Set the received image data
          setImage(data.image);
      } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
      }
    };

    const handleVerify = () => {
        // Logic for verification goes here
    }

    return (
        <div className="prompt-container">
            <ConnectButton />
            <h2>Prompt</h2>
            <textarea value={prompt} onChange={handlePromptChange} />
            <Button variant="contained" color="primary" onClick={handleEnter}>Enter</Button>
            <h2>Generated Image</h2>
            <div className="image-box">
                {image && <img src={`data:image/png;base64,${image}`} alt="Generated" />}
            </div>
            <Button variant="contained" color="secondary" onClick={handleVerify}>Verify</Button>
        </div>
    );
};

export default Prompt;





