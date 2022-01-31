import React, { useCallback, useState } from "react";
import { CalculatorOutlined, LoadingOutlined } from "@ant-design/icons"

export default ({ locales, calculateStats, refresh, topic, subscription }) => {
    const [calculating, setCalculating] = useState(false);
    const handleCalculateStats = useCallback(async () => {
        setCalculating(true);
        await calculateStats({
            topic,
            subscription
        });
        setCalculating(false);
        await refresh();
    }, [topic, subscription, calculateStats]);

    return (
        <>
            <a onClick={handleCalculateStats}>
                {calculating ? <LoadingOutlined /> : <CalculatorOutlined />}
                {" "}
                {locales.calculate}
            </a>
        </>
    );
};
