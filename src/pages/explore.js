import Head from 'next/head';

import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <p>Loading...</p>
});

export default function Home() {
  return (
    <div>
      <MapWithNoSSR />
    </div>
  );
}