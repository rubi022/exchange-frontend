import * as React from "react";
import Logo from "../../../assets/images/logo.png";
import BrandName1 from "../../../assets/images/BrandName1.png";
import BrandName2 from "../../../assets/images/BrandName2.png";

export const AuthBrand = () => {
    return (
        <div className="d-flex justify-content-center align-items-center flex-column">
            <div>
                <img src={Logo} className="auth-page-logo"/>
            </div>
            <div className="mt-3 auth-page-brand-one">
                <img src={BrandName1}/>
            </div>
            <div className="mt-n3 auth-page-brand-two">
                <img src={BrandName2}/>
            </div>
        </div>
    )
}
