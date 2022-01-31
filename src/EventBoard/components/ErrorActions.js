import React, { useCallback, useState } from "react";
import { Button, Divider } from "antd";
import { RedoOutlined, LoadingOutlined, CheckOutlined } from "@ant-design/icons";

export default ({ locales, republish, markAsSuccess, topic, subscription, events, refresh }) => {
    const [republishing, setRepublishing] = useState(false);
    const [marking, setMarking] = useState(false);

    const handleRepublish = useCallback(async () => {
        setRepublishing(true);
        await republish({
            topic,
            subscription,
            events
        });
        setRepublishing(false);
    }, [topic, subscription, events, republish]);

    const handleMarkAsSuccess = useCallback(async () => {
        setMarking(true);
        await markAsSuccess({
            topic,
            subscription,
            events
        });
        setMarking(false);
        await refresh();
    }, [topic, subscription, events, markAsSuccess]);

    return (
        <>
            <a onClick={handleRepublish}>
                {republishing ? <LoadingOutlined /> : <RedoOutlined />}
                {" "}
                {locales.republish}
            </a>
            <Divider type="vertical" />
            <a onClick={handleMarkAsSuccess}>
                {marking ? <LoadingOutlined /> : <CheckOutlined />}
                {" "}
                {locales.markAsSuccess}
            </a>
        </>
    );
};
