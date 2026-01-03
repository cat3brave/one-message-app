function MessageCard({ text, tag }) {
  const getTagClass = (tag) => {
    if (tag === "自己肯定") return "message-tag--self";
    if (tag === "励まし") return "message-tag--encourage";
    if (tag === "行動") return "message-tag--action";
    return "";
  };

  return (
    <div className="message">
      <p>{text}</p>
      <p className={`message-tag ${getTagClass(tag)}`}>#{tag}</p>
    </div>
  );
}

export default MessageCard;
