import * as React from 'react';
import { FilterInput } from '../';
import { Table } from '../Table/Table';
class Markets extends React.Component {
    constructor(props) {
        super(props);
        this.headers = ['Pair', 'Price'];
        this.title = 'Markets';
        this.searchFilter = (row, searchKey) => {
            return row[0].toLowerCase().includes(searchKey.toLowerCase());
        };
        this.handleFilter = (result) => {
            this.setState({
                filteredData: [...result],
            });
        };
        this.filterType = (headerKey, searchKey) => (item) => {
            const typeIndex = this.headers.indexOf(headerKey);
            return item[typeIndex].includes(searchKey);
        };
        this.getMarketFromDataRow = (market) => market[0];
        this.transformCurrencyToFilter = (currency) => ({
            name: currency,
            filter: this.filterType('Pair', currency),
        });
        this.state = {
            filteredData: props.data,
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({
                filteredData: nextProps.data,
            });
        }
    }
    render() {
        const { filteredData } = this.state;
        const { filters = true } = this.props;
        const tableData = filteredData.length > 0
            ? filteredData
            : [['', '']];
        return (React.createElement("div", { className: "base-markets" },
            React.createElement(Table, { data: tableData, filters: filters ? this.filters : [], header: this.headers, onSelect: this.props.onSelect, titleComponent: this.title }),
            React.createElement(FilterInput, { data: this.props.data, onFilter: this.handleFilter, filter: this.searchFilter })));
    }
    get filters() {
        const { data } = this.props;
        const currencyFilters = data && data.length > 0
            ? this.props.data
                .map(this.getMarketFromDataRow)
                .reduce(this.createUniqueCurrencies, [])
                .map(this.transformCurrencyToFilter)
            : [];
        return [
            {
                name: 'All',
                filter: this.filterType('Pair', ''),
            },
            ...currencyFilters,
        ];
    }
    createUniqueCurrencies(currencies, market) {
        const isCurrencyUnique = (currency) => !currencies.includes(currency);
        const marketCurrencies = market.split('/').map((c) => c.trim());
        const uniqueCurrencies = marketCurrencies.filter(isCurrencyUnique);
        return currencies.concat(uniqueCurrencies);
    }
}
export { Markets, };
