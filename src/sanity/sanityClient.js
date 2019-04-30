import sanityClient from '@sanity/client';

const client = sanityClient({
    projectId: 'bogu9rs8',
    dataset: 'production'
});

export default client;
