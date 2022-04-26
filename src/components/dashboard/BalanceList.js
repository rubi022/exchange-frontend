import React from 'react'

function BalanceList({ currencyId, currencyName, currencyAvailable, locked, icon_url }) {
    return (
        <tr>
            <td>
                <img src={icon_url} className="icon-img-currency" /> &nbsp;
                &nbsp; {currencyId.toUpperCase()}
            </td>

            <td>{currencyName}</td>
            <td>{currencyAvailable}</td>
            <td>{locked}</td>

            <td>
                {' '}
                <button className="btn btn-primary">Deposit</button>
                &nbsp; &nbsp; &nbsp;
                <button className="btn btn-primary btn-withdrw">
                    Withdraw
                </button>
            </td>
            {/* <td>{min_price}</td>
            <td>{min_price}</td> */}
        </tr>
    )
}

export default BalanceList
