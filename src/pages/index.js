import Head from 'next/head';

import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('../../components/Map'), {
  ssr: false,
  loading: () =>
    <><Head>
      <title>Rice Phenology Dataset</title>
    </Head><div class="flex flex-col items-center justify-center h-screen bg-gray-500">
        <div class="lds-spinner">
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
        <h1 class="text-3xl font-semibold text-white text-center mt-3">Rice is the primary food source for more than half of the world's population. <br/><br/><br/> Initializing App. Loading Map...</h1>
      </div></>

});

export default function Home() {
  return (
    <div>
      <MapWithNoSSR />
    </div>
  );
}
