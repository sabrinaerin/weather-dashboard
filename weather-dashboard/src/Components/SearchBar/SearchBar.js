import React, { useState, useEffect } from 'react';

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);

    const fetchSuggestions = async () => {
        try {
            if (query.trim() === "") {
                setSuggestions([]);
                return;
            }

            const response = await fetch(`http://localhost:5000/api/locations?query=${query}`);
            if (!response.ok) {
                throw new Error("Failed to fetch suggestions");
            }

            const data = await response.json();
            setSuggestions(data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchSuggestions();
    }, [query]);

    if (error) return <p>{error}</p>;

    return (
        <div>
            <input
                type="text"
                placeholder="Search city..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="search-input"
            />
            {suggestions.length > 0 && (
                <ul aria-label="dropdown-suggestions">
                    {suggestions.map((suggestion, index) => (
                        <li key={index}>
                            {suggestion.name}, {suggestion.state}, {suggestion.country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
