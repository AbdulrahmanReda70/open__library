import { useState, useEffect } from 'react';

function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        const updateMatch = () => setMatches(mediaQuery.matches);

        // Set the initial value
        updateMatch();

        // Listen for changes
        mediaQuery.addEventListener('change', updateMatch);

        // Cleanup listener on unmount
        return () => mediaQuery.removeEventListener('change', updateMatch);
    }, [query]);

    return matches;
}

export default useMediaQuery;
