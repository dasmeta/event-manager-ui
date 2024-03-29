import React, { useState, useCallback } from "react";
import { Input, Popover, Button } from "antd";
import { LoadingOutlined, RedoOutlined } from "@ant-design/icons";

export default ({ subscription, topic, republish, refresh, title, buttonText }) => {
    const [value, setValue] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [visible, setVisible] = useState(false);
    const handleRepublish = useCallback(() => {
        setProcessing(true);
        setVisible(false);
        const data = {
            topic,
            subscription
        };
        if(value) {
            data.limit = value;
        }
        republish(data).then(() => {
            setProcessing(false);
            refresh();
        });
    }, [topic, subscription, value, republish]);

    return (
        <Popover
            title={title}
            placement="leftBottom"
            visible={visible}
            content={
                <div>
                    <Input
                        type="number"
                        placeholder="Limit"
                        defaultValue={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <br />
                    <br />

                    <Button type="primary" onClick={handleRepublish}>
                        Process
                    </Button>
                </div>
            }
        >
            <a onClick={() => setVisible(!visible)}>
                {processing ? <LoadingOutlined /> : <RedoOutlined />}
                {" "}
                {buttonText}
            </a>
        </Popover>
    );
};
