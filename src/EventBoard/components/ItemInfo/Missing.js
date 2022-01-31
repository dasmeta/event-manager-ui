import React, { useCallback, useState } from "react";
import { Divider, Popconfirm, Radio } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { isMissing } from "../../../utils/helper";
import formatMoney from "../../../utils/format-number";
import styles from "../../../styles";

export default ({ item, locales, populateMissing, refresh }) => {
    const [processing, setProcessing] = useState(false);
    const [as, setAs] = useState("fail");
    const handleChangeRadio = useCallback(
        e => {
            setAs(e.target.value);
        },
        [setAs]
    );
    const handlePopulateMissing = useCallback(() => {
        setProcessing(true);
        populateMissing({
            topic: item.topic,
            subscription: item.subscription,
            as,
        }).then(() => {
            setProcessing(false);
            refresh();
        });
    }, [item, as]);

    if (!isMissing(item)) {
        return null;
    }

    return (
        <>
            <Divider type="vertical" />
            {locales.missing}:{" "}
            {processing ? (
                <a style={styles.error}>
                    <LoadingOutlined />
                </a>
            ) : (
                <Popconfirm
                    title={
                        <>
                            <div>
                                <i style={{color: "red"}}>This operation may have slow performance</i>
                            </div>
                            <div>
                                <strong>Populate Missing Subscriptions As</strong>
                            </div>
                            <div>
                                <Radio.Group onChange={handleChangeRadio} value={as}>
                                    <Radio style={{ display: "block" }} value="fail">
                                        {locales.default}
                                    </Radio>
                                    <Radio style={{ display: "block" }} value="success">
                                        {locales.success}
                                    </Radio>
                                    <Radio style={{ display: "block" }} value="error">
                                        {locales.error}
                                    </Radio>
                                </Radio.Group>
                            </div>
                        </>
                    }
                    onConfirm={handlePopulateMissing}
                >
                    <a style={styles.error}>{formatMoney(item.missing)}</a>
                </Popconfirm>
            )}
        </>
    );
};
