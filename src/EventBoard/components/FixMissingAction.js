import React, { useState, useCallback } from "react";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";

export default ({ item, fixMissing, refresh, locales }) => {
    const [processing, setProcessing] = useState(false);
    const handleCleanAnomaly = useCallback(() => {

        if(!processing) {
            setProcessing(true);
            fixMissing({
                topic: item.topic,
                subscription: item.subscription
            }).then(() => {
                setProcessing(false);
                refresh();
            });
        }
    }, [item, fixMissing]);

    return (
        <>
            <a onClick={handleCleanAnomaly}>
                {processing ? <LoadingOutlined /> : <DeleteOutlined />}
                {" "}
                {locales.fixMissing}
            </a>
        </>
    );
};
