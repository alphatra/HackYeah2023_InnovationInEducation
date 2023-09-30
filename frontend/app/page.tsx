'use client'
import Image from 'next/image'
import styles from './page.module.css'
import React, { useState, useEffect } from 'react'; // <--- import the hook

interface QuestionObject {
  question: string;
  answers: string[];
}

const Component = () => {
  const [data, setData] = useState<QuestionObject[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Adres API, z którego pobierane są dane
    const apiURL = 'http://localhost:8000/get_items/';

    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {data ? (
        <div>
          <h1>Pytania z API:</h1>
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                <strong>{item.question}</strong>
                <ul>
                  {item.answers.map((answer, aIndex) => (
                    <li key={aIndex}>{answer}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <Component/>
  )
}
