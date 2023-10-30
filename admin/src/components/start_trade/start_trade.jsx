import {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "../../services/with_router";
import {setTradeStock} from "../../reduce/reducer";
import {POST_REQUEST} from "../../services/request";

class Start_trade extends Component {
    constructor(props) {
        super(props);
        this.navigation=this.navigation.bind(this);
        this.start_trade = this.start_trade.bind(this)
    }

    navigation(url)
    {
        this.props.navigate(url)
    }

    start_trade(){
        const selectedStocks = document.querySelectorAll('input.choose_stocks:checked');
        const selectedStockValues = Array.from(selectedStocks).map(stock => stock.value);
        this.props.setTradeStock(selectedStockValues)
        POST_REQUEST("/api/stocks/")
    }

    render(){
        let stocks = this.props.stocks
        return(
            <div>
                {stocks.map((stock, index) => (
                    <div key={index}>
                        <input className="choose_stocks" type="checkbox" name="stocks" value={stock.full} />
                        <label>{stock.full}</label>
                    </div>
                ))}
                <input id="interval" placeholder="interval as seconds"/>
                <input id="start_date" type="date"/>
                <button onClick={() => {
                    this.start_trade()
                    this.navigation("/stock_graphics")
                }}>start trade</button>
                <button onClick={() => {
                    this.navigation("/stocks_list")
                }}>close</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    stocks: state.reducer.stocks
});

const mapDispatchToProps = {
    setTradeStock
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Start_trade));