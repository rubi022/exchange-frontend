import React from 'react'

function MarketList({ name, last_price, percent_change, daily_low, daily_high, daily_volume  }) {
    return (
        <tr>
            <td>
                {name}
            </td>

            <td>{last_price}</td>
            <td>{percent_change}</td>
            <td>{daily_low}</td>
            <td>
                {daily_high}
            </td>
            <td>
                {daily_volume}
            </td>
        </tr>
    )
}

export default MarketList
