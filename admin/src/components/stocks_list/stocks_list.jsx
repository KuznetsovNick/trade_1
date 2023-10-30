import React, { Component } from "react";
import {connect} from "react-redux";
import { GET_REQUEST } from "../../services/request";
import {withRouter} from "../../services/with_router";
import {setStock, setStocks} from "../../reduce/reducer";

class StocksList extends Component {
    constructor(props) {
        super(props);
        this.navigation=this.navigation.bind(this);
    }

    navigation(url)
    {
        this.props.navigate(url)
    }

    componentDidMount() {
        GET_REQUEST("/api/stocks")
            .then(json => {
                this.props.setStocks(json);
            });
    }

    handleStockClick = (stock) => {
        this.props.setStock(stock);
        this.navigation("/stock_card");
    };

    render() {
        const stocks = this.props.stocks;

        return (
            <div>
                <ul id="stocks_list">
                    {stocks.map(stock => (
                        <li key={stock.id} onClick={() => this.handleStockClick(stock)}>
                            {stock.full} ({stock.id})
                        </li>
                    ))}
                </ul>
                <button onClick={() => this.navigation("/")}>Close</button>
                <button onClick={() => this.navigation("/start_trade")}>Start</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    stocks: state.reducer.stocks
});

const mapDispatchToProps = {
    setStock,
    setStocks
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StocksList));
