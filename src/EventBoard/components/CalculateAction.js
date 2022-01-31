import React, { useCallback, useState } from "react";
import { Button } from "antd";
import { CalculatorOutlined } from "@ant-design/icons"

export default ({ locales, calculateStats, refresh }) => {
    const [calculating, setCalculating] = useState(false);
    const handleCalculateStats = useCallback(async () => {
        setCalculating(true);
        await calculateStats();
        setCalculating(false);
        await refresh();
    });

    return (
        <Button icon={<CalculatorOutlined />} loading={calculating} onClick={handleCalculateStats}>
            {locales.calculate}
        </Button>
    );
};
