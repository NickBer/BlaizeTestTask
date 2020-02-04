import React from "react";

function BlockListItems(props) {
  const blocks = props.blocks;
  if (blocks) {
    const list = blocks.map(block => blockToElement(block, props.onClick));
    return <ul className="list-group mx-auto">{list}</ul>;
  }
  return <ul></ul>;
}
BlockListItems.propTypes = {
  blocks: Array,
  onClick: Function
};
function blockToElement(block, onClick) {
  let t = new Date();
  t.setTime(block.timestamp * 1000);
  return (
    <li key={block.number} className="list-group-item list-group-item-action">
      <p>
        Block number: <span className="text-muted">{block.number}</span>
      </p>
      <p>
        Hash: <span className="text-muted">{block.hash}</span>
      </p>
      <p>
        Parent hash: <span className="text-muted">{block.parentHash}</span>
      </p>
      <p>
        Number of transactions:{" "}
        <span className="text-muted">{block.transactions.length}</span>
      </p>
      <p>
        Gas used: <span className="text-muted">{block.gasUsed}</span>
      </p>
      <p>
        Time:{" "}
        <span className="text-muted">
          {t.toLocaleDateString()}{" "}
          {t.toLocaleTimeString("en-US", { hour12: false })}
        </span>
      </p>
      <p>
        Size:{" "}
        <span className="text-muted">{Math.round(block.size / 1024)}kb</span>
      </p>
      <button
        type="button"
        className="close"
        onClick={e => onClick(block.number)}
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </li>
  );
}

export default BlockListItems;
