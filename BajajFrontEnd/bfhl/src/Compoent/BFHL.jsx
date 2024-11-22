import React, { useState } from 'react';

const BFHL = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [message, setMessage] = useState('');
  const [isValid, setIsValid] = useState(null);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      console.log('hello');

      // Validate JSON input
      const parsedInput = JSON.parse(jsonInput); // Throws error if invalid
      console.log('Parsed JSON:', parsedInput);

      const response = await fetch('http://localhost:8080/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonInput, // Send raw JSON string
      });

      const result = await response.json();
      console.log(result);
      setMessage('Request was successful!');
    } catch (error) {
      console.error(error);
      setMessage(error.message || 'Input should be valid JSON.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>JSON Input Validator and API Tester</h2>
      <form onSubmit={handleSubmitForm}>
        <div>
          <label htmlFor="jsoninput">Enter JSON Input:</label>
          <textarea
            id="jsoninput"
            rows="8"
            cols="50"
            placeholder='Enter JSON... e.g. {"full_name": "John Doe", "dob": "1999-09-17", "input": [1, "a"]}'
            onChange={(e) => setJsonInput(e.target.value)}
            value={jsonInput}
            style={{ display: 'block', marginBottom: '10px', padding: '10px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
          Submit
        </button>
      </form>
      <div style={{ marginTop: '20px', color: isValid ? 'green' : 'red' }}>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default BFHL;
