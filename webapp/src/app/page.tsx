"use client";

import { useState } from "react";
import DatabaseDownloader from "./download/databaseDownloader";
import Encode from "./encode/Encode";

const Home = () => {
  const [isReady, setIsReady] = useState(false);

  if (isReady) {
    return <Encode />;
  }

  return (
    <DatabaseDownloader
      onDatabaseReady={() => {
        setIsReady(true);
      }}
    />
  );
};

export default Home;
