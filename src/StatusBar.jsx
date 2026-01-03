function StatusBar({ currentIndex, totalCount, isRandomMode, filterTag }) {
  const number = currentIndex + 1;

  let note = "";
  if (currentIndex === 0) {
    note = "（最初のメッセージ）";
  } else if (currentIndex === totalCount - 1) {
    note = "（最後のメッセージ）";
  }

  let mode = "";
  if (isRandomMode) {
    mode = "| ランダム表示中 ";
  }

  const filterLabel = filterTag === "すべて" ? "すべてのタグ" : `#${filterTag}`;

  return (
    <p className="status">
      メッセージ {number} / {totalCount} {note} {mode}
      {" | 表示中: "}
      {filterLabel}
    </p>
  );
}

export default StatusBar;
