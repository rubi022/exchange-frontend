import React from 'react'

function BalanceList({ currency, balance, locked }) {
    return (
        <tr>
            <td>{currency}</td>

            <td>{balance}</td>
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
