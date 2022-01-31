import React, { useState, useCallback } from "react";
import { DatePicker, Popover, Button } from "antd";

const { RangePicker } = DatePicker;

export default ({ item, markAsFail, refresh }) => {
    const [range, setRange] = useState([]);
    const [processing, setProcessing] = useState(false);
    const handleMarkAsFail = useCallback(() => {
        setProcessing(true);
        markAsFail({
            topic: item.topic,
            subscription: item.subscription,
            start: range[0].toDate(),
            end: range[1].toDate(),
        }).then(() => {
            setProcessing(false);
            refresh();
        });
    }, [item, range, markAsFail]);

    return (
        <Popover
            trigger="click"
            title="Mark As Fail"
            placement="leftBottom"
            content={
                <div>
                    <RangePicker
                        placeholder={["Start Time ", "End Time"]}
                        value={range}
                        onChange={value => setRange(value)}
                    />

                    <br />
                    <br />

                    <Button type="primary" loading={processing} onClick={handleMarkAsFail} disabled={!range.length}>
                        Process
                    </Button>
                </div>
            }
        >
            <a>Mark As Fail</a>
        </Popover>
    );
};
