import React, { useCallback, useState } from "react";
import { Divider, Popconfirm, Radio } from "antd";
import { LoadingOutlined } from "@ant-design/icons"
import { isAnomaly } from "../../../utils/helper";
import formatMoney from "../../../utils/format-number";
import styles from "../../../styles";

export default ({ item, locales, cleanAnomaly, refresh }) => {
    const [processing, setProcessing] = useState(false);

    const handleCleanAnomaly = useCallback(() => {
        setProcessing(true);
        cleanAnomaly({
            topic: item.topic,
            subscription: item.subscription,
        }).then(() => {
            setProcessing(false);
            refresh();
        });
    }, [item]);

    if (!isAnomaly(item)) {
        return null;
    }

    return (
        <>
            <Divider type="vertical" />
            {locales.anomaly}:{" "}
            {processing ? (
                <a style={styles.error}>
                    <LoadingOutlined />
                </a>
            ) : (
                <Popconfirm title="Clean Anomaly Subscriptions?" onConfirm={handleCleanAnomaly}>
                    <a style={styles.error}>{formatMoney(item.subscriptionCount - item.topicCount)}</a>
                </Popconfirm>
            )}
        </>
    );
};
