import React, { useState } from 'react';

const InputForm = () => {
  // State variables to store form input values
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  // Function to handle form submission
  const submitHandler = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Create a new product object with the form data
    const newProduct = {
      
      name: name,
      description: description,
      price: parseFloat(price), // Convert price to a number
    };

    // Send a POST request to your API endpoint
    fetch('https://crudcrud.com/api/9c41744241ce4fbfb749ed33b98ed43f/products', {
      method: 'POST',
      body: JSON.stringify(newProduct), // Convert the product object to JSON
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          // Handle success (e.g., show a success message)
          console.log('Product added successfully.');
          // Clear the form fields after successful submission
          setName('');
          setDescription('');
          setPrice('');
        } else {
          // Handle errors (e.g., show an error message)
          console.error('Failed to add product.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <form onSubmit={submitHandler}>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <label>Description:</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <label>Price:</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />
      <button type="submit">Add</button>
    </form>
  );
};

export default InputForm;
