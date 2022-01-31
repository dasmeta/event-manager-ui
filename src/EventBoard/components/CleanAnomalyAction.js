import React, { useState, useCallback } from "react";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";

export default ({ item, cleanAnomaly, refresh, locales }) => {
    const [processing, setProcessing] = useState(false);
    const handleCleanAnomaly = useCallback(() => {
        setProcessing(true);
        cleanAnomaly({
            topic: item.topic,
            subscription: item.subscription
        }).then(() => {
            setProcessing(false);
            refresh();
        });
    }, [item, cleanAnomaly]);

    return (
        <>
            <a onClick={handleCleanAnomaly}>
                {processing ? <LoadingOutlined /> : <DeleteOutlined />}
                {" "}
                {locales.cleanAnomaly}
            </a>
        </>
    );
};
