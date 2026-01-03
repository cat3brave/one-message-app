function Controls({
  onPrev,
  onNext,
  onRandom,
  onReset,
  prevLabel = "前のひと言",
  nextLabel = "次のひと言",
  randomLabel = "ランダム",
  isRandomMode = false,
}) {
  return (
    <div className="button-row">
      <button className="next-button" onClick={onPrev}>
        {prevLabel}
      </button>
      <button className="next-button" onClick={onNext}>
        {nextLabel}
      </button>

      <button
        className={`next-button ${isRandomMode ? "next-button--active" : ""}`}
        onClick={onRandom}
      >
        {randomLabel}
      </button>
      <button className="next-button" onClick={onReset}>
        最初に戻る
      </button>
    </div>
  );
}
export default Controls;
