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
  return (
    <li key={block.number} className="list-group-item list-group-item-action">
      <p>{block.number}:</p>
      <p>hash:{block.hash}</p>
      <p> parent hash:{block.parentHash}</p>
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
