"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import styles from "./pet-facts.module.css";
import React from "react";

// Unnecessary type
type ButtonType = "cat" | "dog";

// Global variables that should be constants
const CAT_API_URL = "/api/cats";
const DOG_API_URL = "/api/dogs";

// Unnecessary context that's not used
const FactContext = React.createContext(null);

export default function PetFactsPage() {
  // Too many state variables that could be combined
  const [fact, setFact] = useState<string>(
    "Your pet facts will appear here..."
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);
  const [fetchCount, setFetchCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<ButtonType | null>(null);

  // Unnecessary ref
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Unnecessary complex fetch function with duplication
  const fetchCatFact = async () => {
    console.log("Fetching cat fact...");
    setIsLoading(true);
    setSelectedAnimal("cat");
    setError(null);

    // Unnecessary delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      console.log("Making request to:", CAT_API_URL);
      const startTime = performance.now();

      const response = await fetch(CAT_API_URL);

      // Unnecessary performance logging
      const endTime = performance.now();
      console.log(`Request took ${endTime - startTime}ms`);

      if (!response.ok) {
        console.error("Response not OK:", response.status);
        throw new Error("Failed to fetch cat fact");
      }

      // Unnecessary logging
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      const data = await response.json();

      // Unnecessary logging of full response
      console.log("Full response data:", data);

      // Unnecessary string manipulation
      const factText = data.fact
        ? data.fact.toString().trim()
        : "No cat fact found";
      console.log("Fact text:", factText);

      setFact(factText);
      setLastFetchTime(Date.now());
      setFetchCount((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching cat fact:", error);
      setFact("Failed to fetch cat fact. Please try again.");
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      // Unnecessary delay before setting loading state
      setTimeout(() => {
        setIsLoading(false);
        console.log("Cat fact fetch completed");
      }, 300);
    }
  };

  // Duplicated code that could be combined with the function above
  const fetchDogFact = async () => {
    console.log("Fetching dog fact...");
    setIsLoading(true);
    setSelectedAnimal("dog");
    setError(null);

    // Unnecessary delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      console.log("Making request to:", DOG_API_URL);
      const startTime = performance.now();

      const response = await fetch(DOG_API_URL);

      // Unnecessary performance logging
      const endTime = performance.now();
      console.log(`Request took ${endTime - startTime}ms`);

      if (!response.ok) {
        console.error("Response not OK:", response.status);
        throw new Error("Failed to fetch dog fact");
      }

      // Unnecessary logging
      console.log("Response status:", response.status);

      // Different handling for dog facts (text instead of json)
      const factText = await response.text();

      // Unnecessary logging
      console.log("Fact text:", factText);

      setFact(factText);
      setLastFetchTime(Date.now());
      setFetchCount((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching dog fact:", error);
      setFact("Failed to fetch dog fact. Please try again.");
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      // Unnecessary delay before setting loading state
      setTimeout(() => {
        setIsLoading(false);
        console.log("Dog fact fetch completed");
      }, 300);
    }
  };

  // Unnecessary useEffect
  useEffect(() => {
    console.log("Component mounted");
    return () => {
      console.log("Component unmounted");
    };
  }, []);

  // Unnecessary useEffect that logs state changes
  useEffect(() => {
    console.log("Fact changed:", fact);
  }, [fact]);

  // Unnecessary memoization
  const formattedLastFetchTime = useMemo(() => {
    if (lastFetchTime === 0) return "Never";
    return new Date(lastFetchTime).toLocaleTimeString();
  }, [lastFetchTime]);

  // Unnecessary callback
  const handleButtonClick = useCallback((type: ButtonType) => {
    console.log(`Button clicked: ${type}`);
    if (type === "cat") {
      fetchCatFact();
    } else {
      fetchDogFact();
    }
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Pet Facts</h1>
        <p>Click a button to get a random fact about cats or dogs!</p>

        {/* Unnecessary debug info */}
        <div className={styles.debugInfo}>
          <p>Last fetch: {formattedLastFetchTime}</p>
          <p>Fetch count: {fetchCount}</p>
          {error && <p className={styles.error}>Error: {error}</p>}
        </div>

        <div className={styles.buttonContainer}>
          <button
            ref={buttonRef}
            className={`${styles.button} ${styles.catButton} ${
              selectedAnimal === "cat" ? styles.selected : ""
            }`}
            onClick={() => handleButtonClick("cat")}
            data-testid="cat-button"
            aria-label="Get Cat Fact"
          >
            Get Cat Fact
          </button>
          <button
            className={`${styles.button} ${styles.dogButton} ${
              selectedAnimal === "dog" ? styles.selected : ""
            }`}
            onClick={() => handleButtonClick("dog")}
            data-testid="dog-button"
            aria-label="Get Dog Fact"
          >
            Get Dog Fact
          </button>
        </div>

        <div className={styles.factContainer}>
          {isLoading ? (
            <>
              <div className={styles.loader}></div>
              {/* Unnecessary loading text */}
              <p className={styles.loadingText}>
                Loading {selectedAnimal} fact...
              </p>
            </>
          ) : (
            <>
              <p className={styles.factText}>{fact}</p>
              {/* Unnecessary timestamp */}
              <small className={styles.timestamp}>
                {lastFetchTime > 0 &&
                  `Fetched at: ${new Date(lastFetchTime).toLocaleTimeString()}`}
              </small>
            </>
          )}
        </div>

        {/* Unnecessary button that duplicates functionality */}
        <button
          className={styles.refreshButton}
          onClick={() =>
            selectedAnimal === "cat" ? fetchCatFact() : fetchDogFact()
          }
          disabled={isLoading || !selectedAnimal}
        >
          Refresh Fact
        </button>
      </main>
    </div>
  );
}
