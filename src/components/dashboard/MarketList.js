import React from 'react'

function MarketList({ name, max_price, min_amount, min_price }) {
    return (
        <tr>
            <td>
                {name}
            </td>

            <td>{max_price}</td>
            <td>{min_amount}</td>
            <td>{min_price}</td>
            <td>
                {min_price}
            </td>
            <td>
                {min_price}
            </td>
        </tr>
    )
}

export default MarketList