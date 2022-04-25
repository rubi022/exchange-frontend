import React from 'react'

function BalanceList({ currencyId, currencyName, deposit_fee, icon_url }) {
    return (
        <tr>
            <td>
                <img src={icon_url} className="icon-img-currency" /> &nbsp;
                &nbsp; {currencyId}
            </td>

            <td>{currencyName}</td>
            <td>{deposit_fee}</td>
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
