import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export default function ProfPrompt({ profLevels, setProfLevels }) {

  const { languages } = useParams();
  const selectedLanguages = languages ? languages.split(",") : [];

  // useEffect(() => {
  //   // Split the languages parameter into an array of selected languages


  //   console.log("Selected languages from URL:", selectedLanguages);
  //   // Perform any further actions with the selected languages
  // }, [languages]);


  const handleProfChange = (language, proficiency) => {
    setProfLevels((prevLevels) => ({
      ...prevLevels,
      [language]: proficiency,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the proficiency levels, e.g., send them to the server or update local state
    console.log("Selected proficiency levels:", profLevels);
    // You can navigate to another page or perform any other actions here
    console.log(languages)
  };

  return (
    <div>
      <h1>Select Proficiency Levels</h1>
      <form onSubmit={handleSubmit}>
        {selectedLanguages.map((language) => (
          <div key={language}>
            <h2>{language}</h2>
            <select
              value={profLevels[language] || ""}
              onChange={(e) => handleProfChange(language, e.target.value)}
            >
              <option value="">Select proficiency level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        ))}
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}