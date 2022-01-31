import React from "react";
import { Tag } from "antd";
import { isAnomaly, isError, isFail, isMissing, isSuccess } from "../../utils/helper";

export default ({ item, locales }) => {
    const status = [];
    if (isError(item)) {
        status.push(<Tag color="#f50">{locales.error}</Tag>);
    }
    if (isFail(item)) {
        status.push(<Tag color="#f50">{locales.fail}</Tag>);
    }
    if (isMissing(item)) {
        status.push(<Tag color="volcano">{locales.missing}</Tag>);
    }
    if (isAnomaly(item)) {
        status.push(<Tag color="red">{locales.anomaly}</Tag>);
    }
    if (isSuccess(item)) {
        status.push(<Tag color="green">{locales.success}</Tag>);
    }

    return status;
};
