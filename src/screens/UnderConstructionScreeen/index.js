import * as React from 'react';
import {UnderConstructionIcon} from "../../assets/images/UnderConstructionIcon";
import {setDocumentTitle} from "../../helpers";

class UnderConstructionContainer extends React.Component {

    componentDidMount() {
        setDocumentTitle(
            'Under Construction'
        );
    }

    render() {
        return(
            <div className={'under-construction-page__wrapper'}>
                <div className={'under-construction-text-1'}>
                     Updating the system 
                </div>
                <div className={'under-construction-icon__wrapper'}>
                    <UnderConstructionIcon />
                </div>
                <div className={'under-construction-text-2'}>
                    Please come back later.
                </div>
            </div>
        )
    }
}

export const UnderConstruction = UnderConstructionContainer;
