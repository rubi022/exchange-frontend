import { Button } from '@components/components';
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setDocumentTitle } from '../../helpers';
import Swiper from 'react-id-swiper';
import { Pagination, Navigation } from 'swiper/dist/js/swiper.esm';
import { MarketsComponent} from "../../containers/Markets";
import {marketsFetch, selectMarkets} from "../../modules/public/markets";
import {rangerConnectFetch} from "../../modules/public/ranger";
import {selectRanger} from "../../modules/public/ranger/selectors";
import {selectUserLoggedIn} from "../../modules/user/profile";

class HomeComponent extends React.Component {
    constructor(props) {
        super(props);

        this.translate = (id) => this.props.intl.formatMessage({ id });
        this.title = this.translate('page.body.wallets.tabs.deposit.fiat.message1');
        this.description = this.translate('page.body.wallets.tabs.deposit.fiat.message2');
        this.onTabChange = (index, label) => this.setState({ tab: label });
        this.onActiveIndexChange = index => this.setState({ activeIndex: index });
        this.onCurrentTabChange = index => this.setState({ currentTabIndex: index });
    }
    componentDidMount() {
        setDocumentTitle('Home');
        const { markets, userLoggedIn, rangerState: { connected } } = this.props;

        if (markets.length < 1) {
            this.props.marketsFetch();
        }
        if (!connected) {
            this.props.rangerConnect({ withAuth: userLoggedIn });
        }
    }
    componentWillUnmount() {
    }
    componentWillReceiveProps(next) {

    }
    render() {
        const params = {
            modules: [Pagination, Navigation],
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            slidesPerView: 3,
            spaceBetween: 20,
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                }
            },
        };
        const exchangeName = window.env.name || "Exchange";
        return (
            React.createElement(React.Fragment, null,
                React.createElement("div",{className: "wholediv home"},
                    React.createElement("div",{className: "main-row bg-img"},
                        React.createElement("div",{className: "container"},
                            React.createElement("div",{className: "row"},
                                React.createElement("div",{className: "mainhead"},
                                    React.createElement("h3",{className: "mtop40 bg-h3color"}, exchangeName + " - Your Great Choice"))),
                            React.createElement("div",{className: "row"},
                                React.createElement("div",{className: "col-md-12"},
                                    React.createElement("div",{className: "divslider mtop40"},
                                        React.createElement("div",{className: "swiper-container"},
                                            React.createElement(Swiper,{className: "swiper-wrapper", ...params},
                                                React.createElement("div",{className: "swiper-slide"},
                                                    React.createElement("img",{src: require("../../assets/images/one.jpg"), className: "img-bodr"})),
                                                React.createElement("div",{className: "swiper-slide"},
                                                    React.createElement("img",{src: require("../../assets/images/one.jpg"), className: "img-bodr"})),
                                                React.createElement("div",{className: "swiper-slide"},
                                                    React.createElement("img",{src: require("../../assets/images/one.jpg"), className: "img-bodr"})),
                                                React.createElement("div",{className: "swiper-slide"},
                                                    React.createElement("img",{src: require("../../assets/images/one.jpg"), className: "img-bodr"})),
                                                React.createElement("div",{className: "swiper-slide"},
                                                    React.createElement("img",{src: require("../../assets/images/one.jpg"), className: "img-bodr"})),
                                                React.createElement("div",{className: "swiper-slide"},
                                                    React.createElement("img",{src: require("../../assets/images/one.jpg"), className: "img-bodr"}))
                                            ),
                                            React.createElement("div",{className: "swiper-pagination"})
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement("div",{className: "seconddiv"},
                        React.createElement("div",{className: "container"},
                            React.createElement("div",{className: "container mtop40"},
                                React.createElement("div",{className: "row"},
                                    React.createElement("div",{className: "col-md-12"},
                                        React.createElement("div",{className: "table-responsive"},
                                            React.createElement(MarketsComponent, null))
                                    ),
                                )))),
                    React.createElement("div", {
                        className: "layout-footer-center ivu-layout-footer"
                    }, React.createElement("div", {
                        className: "menu-footer container"
                    }, React.createElement("div", {
                            className: "row"
                        }, React.createElement("div", {
                            className: "col-md-4"
                        }, React.createElement("ul", null, React.createElement("li", {
                            className: "title"
                        }, React.createElement("img", {
                            src: window.env.image, className: "footer-logo__img"
                        }), React.createElement("span", {
                            className: "logotxt"
                        }, window.env.name || "Exchange")),)),
                        React.createElement("div", {
                            className: "col-md-2"
                        }, React.createElement("ul", null, React.createElement("li", {
                            className: "title"
                        }, "Example"), React.createElement("li", {
                            className: "m"
                        }, React.createElement("a", null, "Example")), React.createElement("li", {
                            className: "m"
                        }, React.createElement("a", null, "Example")), React.createElement("li", {
                            className: "m"
                        }, React.createElement("a", null, "Example")), React.createElement("li", {
                            className: "m"
                        }, React.createElement("a", null, "Example")))), React.createElement("div", {
                            className: "col-md-2"
                        }, React.createElement("ul", null, React.createElement("li", {
                            className: "title"
                        }, "Example"), React.createElement("li", {
                            className: "m"
                        }, React.createElement("a", null, "Example")), React.createElement("li", {
                            className: "m"
                        }, React.createElement("a", null, "Example")), React.createElement("li", {
                            className: "m"
                        }, React.createElement("a", null, "Example")), React.createElement("li", {
                            className: "m"
                        }, React.createElement("a", null, "Example")))), React.createElement("div", {
                            className: "col-md-4"
                        }, React.createElement("ul", {
                                className: "contact"
                            }, React.createElement("li", {
                                className: "title"
                            }, "Contact Us"),

                        )))), React.createElement("div", {
                        className: "container"
                    }, React.createElement("div", {
                        className: "row"
                    }, React.createElement("div", {
                        className: "col-md-12"
                    }, React.createElement("div", {
                        className: "bottom-footer text-left"
                    }, "\xA9 2019", " All rights reserved.")))))
                ),
            )
        );
    }

}
const mapStateToProps = (state) => ({
    markets: selectMarkets(state),
    rangerState: selectRanger(state),
    userLoggedIn: selectUserLoggedIn(state),
});
const mapDispatchToProps = dispatch => ({
    marketsFetch: () => dispatch(marketsFetch()),
    rangerConnect: (payload) => dispatch(rangerConnectFetch(payload)),
});

export const HomeScreen = injectIntl(withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeComponent)));

