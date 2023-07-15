import {AlertTriangle, AlertCircle} from "react-feather";
import React, { FunctionComponent } from "react";

import { BannerType } from "../../../types";
import { iconProps } from "../../../utils/icons";
import UlIcon from "feather-icons/dist/icons/list.svg";

interface Props {
    className?: string;
    message: string;
    bannerType: BannerType;
}

const Banner: FunctionComponent<Props> = (props: Props): JSX.Element => {
    const { className, message, bannerType } = props;

    const icon = bannerType === "error" ? <AlertTriangle {...iconProps} /> : <AlertCircle {...iconProps} />;

    return (
        <div className={`banner banner-${bannerType} ${className || ""}`}>
            {icon}
            <p className="banner-message">{message}</p>
        </div>
    );
};

export default Banner;
