import React from "react";
import "./index.css";
import {ProfileIcon} from "../../../assets/images/ProfileIcon";
import {APIIcon} from "../../../assets/images/APIIcon";
import {ReferralIcon} from "../../../assets/images/ReferralIcon";
import {ReceiveIcon} from "../../../assets/images/RecieveIcon";
import {LockIcon} from "../../../assets/images/LockIcon";
import {injectIntl} from "react-intl";

const PageLayout = ({ rightComponent, onClickHandler, currentTab, translation }) => (
  <div className="pagelayout-container">
    <ul className="leftContainer">
      <li
        className={currentTab == 0 ? "active-link links" : "links"}
        onClick={() => onClickHandler(0)}
      >
        <div className={'active-link-img'}>
          <ProfileIcon color={currentTab === 0 ? 'var(--sidebar-menu-active-text-color)' : 'var(--sidebar-menu-text-color)'}/>
        </div>
        {translation.formatMessage({id: 'page.profile.section.profile.title'})}
      </li>
      <li
        className={currentTab == 1 ? "active-link links" : "links"}
        onClick={() => onClickHandler(1)}
      >
        <div className={'active-link-img'}>
          <ReferralIcon color={currentTab === 1 ? 'var(--sidebar-menu-active-text-color)' : 'var(--sidebar-menu-text-color)'}/>
        </div>
        {translation.formatMessage({id: 'page.profile.section.referral.title'})}
      </li>
      <li
        className={currentTab == 2 ? "active-link links" : "links"}
        onClick={() => onClickHandler(2)}
      >
        <div className={'active-link-img'}>
          <LockIcon color={currentTab === 2 ? 'var(--sidebar-menu-active-text-color)' : 'var(--sidebar-menu-text-color)'}/>
        </div>
        {translation.formatMessage({id: 'page.profile.section.accountActivity.title'})}
      </li>

      <li
        className={currentTab == 3 ? "active-link links" : "links"}
        onClick={() => onClickHandler(3)}
      >
        <div className={'active-link-img'}>
          <APIIcon color={currentTab === 3 ? 'var(--sidebar-menu-active-text-color)' : 'var(--sidebar-menu-text-color)'}/>
        </div>
        {translation.formatMessage({id: 'page.profile.section.api.title'})}
      </li>

      <li
        className={currentTab == 4 ? "active-link links" : "links"}
        onClick={() => onClickHandler(4)}
      >
        <div className={'active-link-img'}>
          <ReceiveIcon color={currentTab === 4 ? 'var(--sidebar-menu-active-text-color)' : 'var(--sidebar-menu-text-color)'}/>
        </div>
        {translation.formatMessage({id: 'page.profile.section.beneficiary.title'})}
      </li>
    </ul>
    <div className="rightContainer">{rightComponent}</div>
  </div>
);

export default injectIntl(PageLayout);
