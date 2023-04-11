import * as React from 'react';
import {ReactComponent as HomeIcon} from '../../assets/images/icon-home.svg';
import {ReactComponent as ExchangeIcon} from '../../assets/images/icon-exchange.svg';
import {ReactComponent as OtcIcon} from '../../assets/images/icon-otc.svg';
import {ReactComponent as CardsIcon} from '../../assets/images/cards.svg';
import {ReactComponent as PhoneIcon} from '../../assets/images/phone.svg';
import {ReactComponent as GraphIcon} from '../../assets/images/graph.svg';
import {ReactComponent as MiningIcon} from '../../assets/images/mining.svg';
import {ReactComponent as DefiIcon} from '../../assets/images/defi.svg';
import {ReactComponent as StakingIcon} from '../../assets/images/staking.svg';

export class ProductMenuIcon extends React.Component {
    
    render() {
        const { name } = this.props;
        const iconObj = {
            'page.productMenu.home': HomeIcon,
            "page.productMenu.market": GraphIcon,
            "page.productMenu.exchange": ExchangeIcon,
            "page.productMenu.app": PhoneIcon,
            "page.productMenu.cards": CardsIcon,
            "page.productMenu.mining": MiningIcon,
            'page.productMenu.p2p': OtcIcon,
            "page.productMenu.staking": StakingIcon,
            "page.productMenu.defi": DefiIcon,
        }
    
        return React.createElement(iconObj[name], {});

    }
}
