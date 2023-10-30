import {Component} from "react";
import {setStockInfo} from "../../reduce/reducer";
import {connect} from "react-redux";
import {withRouter} from "../../services/with_router";

class Stock_graphics extends Component {
    constructor(props) {
        super(props);
        this.navigation=this.navigation.bind(this);
    }

    navigation(url)
    {
        this.props.navigate(url)
    }
    render() {
        let stocks = this.props.stocks
        return(
            <div>
                {stocks.map((stock, index) => (
                    <div key={index}>
                        {stock}
                    </div>
                ))}

                <button onClick={() => {
                    this.navigation("/start_trade")
                }}>close</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    stocks: state.reducer.trade_stock
});


export default connect(mapStateToProps)(withRouter(Stock_graphics));
