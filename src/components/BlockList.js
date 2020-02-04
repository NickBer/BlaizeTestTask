import React from "react";
import Web3 from "web3";
import BlockListItems from "./BlockListItems";

class BlockList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { blocks: [], blockNumber: 0 };
  }

  componentDidMount() {
    let web3 = new Web3(
      new Web3.providers.WebsocketProvider(
        "wss://mainnet.infura.io/ws/v3/a0bb216866fa4c4fa318eaddffc02eb6"
      )
    );
    let eth = web3.eth;
    this.eth = eth;
    eth.getBlockNumber().then(num => {
      this.setState({
        blockNumber: num - 10
      });
      for (let i = 0; i < 10; i++) {
        eth.getBlock(num - i).then(block => {
          this.setState(state => ({ blocks: [...state.blocks, block] }));
        });
      }
    });
  }

  deleteBlock = number => {
    this.setState(state => {
      let filteredBlocks = state.blocks.filter(
        block => block.number !== number
      );
      return {
        blocks: filteredBlocks
      };
    });
  };

  addBlock = () => {
    this.eth.getBlock(this.state.blockNumber).then(block => {
      this.setState(state => ({
        blocks: [...state.blocks, block],
        blockNumber: state.blockNumber - 1
      }));
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <BlockListItems
            blocks={this.state.blocks}
            onClick={this.deleteBlock}
          ></BlockListItems>
        </div>
        <div className="row">
          <button
            type="button"
            onClick={this.addBlock}
            className="btn btn-primary btn-lg mx-auto mt-2"
          >
            +
          </button>
        </div>
      </div>
    );
  }
}

export default BlockList;