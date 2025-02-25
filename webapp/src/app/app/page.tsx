"use client";

import { useState } from "react";
import DatabaseDownloader from "../download/databaseDownloader";
import Encode from "../encode/Encode";
import Choice from "../choice/choice";
import Decode from "../decode/decode";

enum PageState {
  DOWNLOAD = "DOWNLOAD",
  CHOICE = "CHOICE",
  ENCODE = "ENCODE",
  DECODE = "DECODE",
}

const Home = () => {
  const [pageState, setPageState] = useState(PageState.ENCODE);

  if (pageState === PageState.CHOICE) {
    return (
      <Choice
        onEncodeClick={() => setPageState(PageState.ENCODE)}
        onDecodeClick={() => setPageState(PageState.DECODE)}
      />
    );
  }

  if (pageState === PageState.ENCODE) {
    return <Encode onBack={() => setPageState(PageState.CHOICE)} />;
  }

  if (pageState === PageState.DECODE) {
    return <Decode onBack={() => setPageState(PageState.CHOICE)} />;
  }

  return (
    <DatabaseDownloader
      onDatabaseReady={() => {
        setPageState(PageState.CHOICE);
      }}
    />
  );
};

export default Home;
