import StatusBar from "./StatusBar";
import { useState, useEffect, useCallback } from "react";
import "./App.css";
import MessageCard from "./MessageCard";
import Controls from "./Controls";
import messages from "./messages";

const STORAGE_KEY = "one-message-app:index";
const FILTER_KEY = "one-message-app:filter";

function App() {
  const [index, setIndex] = useState(0);
  const [isRandom, setIsRandom] = useState(false);

  const [filterTag, setFilterTag] = useState("すべて");
  const tag = ["すべて", "自己肯定", "励まし", "行動"];

  const tagCounts = messages.reduce(
    (acc, m) => {
      acc["すべて"] += 1;
      acc[m.tag] = (acc[m.tag] || 0) + 1;
      return acc;
    },
    { すべて: 0 }
  );

  const filteredMessages =
    filterTag === "すべて"
      ? messages
      : messages.filter((m) => m.tag === filterTag);

  useEffect(() => {
    const savedIndex = window.localStorage.getItem(STORAGE_KEY);
    const savedFilter = window.localStorage.getItem(FILTER_KEY);

    if (savedIndex !== null) {
      const num = Number(savedIndex);

      if (!Number.isNaN(num) && num >= 0 && num < messages.length) {
        setIndex(num);
      }
    }

    if (savedFilter !== null) {
      const allowedTags = ["すべて", "自己肯定", "励まし", "行動"];
      if (allowedTags.includes(savedFilter)) {
        setFilterTag(savedFilter);
      }
    }
  }, []); // 初回レンダー時のみ実行

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, String(index));
  }, [index]);

  useEffect(() => {
    window.localStorage.setItem(FILTER_KEY, filterTag);
  }, [filterTag]);

  const handleNext = useCallback(() => {
    if (filteredMessages.length === 0) return;
    setIsRandom(false);
    setIndex((prev) => (prev + 1) % filteredMessages.length);
  }, [filteredMessages.length]);

  useEffect(() => {
    if (filteredMessages.length === 0) return;
    if (index >= filteredMessages.length) {
      setIndex(0);
    }
  }, [filterTag, filteredMessages.length, index]);

  const handlePrev = useCallback(() => {
    if (filteredMessages.length === 0) return;
    setIsRandom(false);
    setIndex(
      (prev) => (prev - 1 + filteredMessages.length) % filteredMessages.length
    );
  }, [filteredMessages.length]);

  const handleRandom = useCallback(() => {
    if (filteredMessages.length === 0) return;
    setIsRandom(true);
    setIndex((prev) => {
      if (filteredMessages.length <= 1) return prev;

      let next = prev;
      while (next === prev) {
        next = Math.floor(Math.random() * filteredMessages.length);
      }
      return next;
    });
  }, [filteredMessages.length]);

  const handleReset = useCallback(() => {
    if (filteredMessages.length === 0) return;
    setIsRandom(false);
    setIndex(0);
  }, [filteredMessages.length]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrev();
      } else if (event.key === "r" || event.key === "R") {
        handleRandom();
      } else if (event.key === "Home") {
        handleReset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext, handlePrev, handleRandom, handleReset]);

  return (
    <div className="app">
      <h1>今日のひと言</h1>

      {/* タグフィルター */}
      <div className="tag-filter-row">
        {tag.map((tag) => (
          <button
            key={tag}
            className={`tag-filter ${
              filterTag === tag ? "tag-filter--active" : ""
            }`}
            onClick={() => {
              setFilterTag(tag);
              setIndex(0);
              setIsRandom(false);
            }}
          >
            {tag === "すべて"
              ? `すべて (${tagCounts["すべて"]})`
              : `${tag} (${tagCounts[tag] || 0})`}
          </button>
        ))}
      </div>

      {/* ここが今回の「修正＆追加」ポイント */}
      {filteredMessages.length === 0 ? (
        // 対象タグのメッセージが 0 件のとき
        <p className="status">このタグのメッセージはまだありません</p>
      ) : (
        // 1 件以上あるときだけカード＋ボタン群を表示
        <>
          <MessageCard
            text={filteredMessages[index].text}
            tag={filteredMessages[index].tag}
          />

          {/* ステータス表示も専用コンポーネントに任せる */}
          <StatusBar
            currentIndex={index}
            totalCount={filteredMessages.length}
            isRandomMode={isRandom}
            filterTag={filterTag}
          />

          {/* コントロール部分も専用コンポーネントに任せる */}
          <Controls
            onPrev={handlePrev}
            onNext={handleNext}
            onRandom={handleRandom}
            onReset={handleReset}
            prevLabel="前のひと言"
            nextLabel="次のひと言"
            randomLabel="ランダム"
            isRandomMode={isRandom}
          />
        </>
      )}
    </div>
  );
}

export default App;
