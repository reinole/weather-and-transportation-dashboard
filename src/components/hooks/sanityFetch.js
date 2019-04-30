import { useEffect, useState } from 'react';
import client from '../../sanity/sanityClient';

function useSanityFetch(options) {
    const [data, setData] = useState(options.initialValue || null);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState(false);

    async function sanityFetch() {
        try {
            setBusy(true);
            const response = await client.fetch(options.query);
            setData(response);
            setBusy(false);
        } catch (error) {
            setBusy(false);
            setError(error);
        }
    }

    useEffect(() => {
        if (options.fetchOnMount) {
            sanityFetch();
        }
    }, []);

    return [busy, data, error];
}

export default useSanityFetch;
