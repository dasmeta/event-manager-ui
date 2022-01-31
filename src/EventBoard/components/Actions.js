import React from "react";
import { Badge, Radio } from "antd";
import CalculateAction from "./CalculateAction";
import { isError, isFail, isPreconditionFail, isMissing, isAnomaly, isSuccess } from "../../utils/helper";
import styles from "../../styles";

export default ({
    locales,
    calculateStats,
    filterKey,
    setFilterKey,
    refresh,
    list
}) => {
    return (
        <>
            <CalculateAction locales={locales} calculateStats={calculateStats} refresh={refresh} />{" "}
            <Radio.Group value={filterKey} onChange={e => setFilterKey(e.target.value)}>
                <Radio.Button value="error">
                    {locales.error} <Badge style={styles.badge} count={list.filter(isError).length} />
                </Radio.Button>

                <Radio.Button value="fail">
                    {locales.fail} <Badge style={styles.badge} count={list.filter(isFail).length} />
                </Radio.Button>

                <Radio.Button value="preconditionFail">
                    {locales.preconditionFail} <Badge style={styles.badge} count={list.filter(isPreconditionFail).length} />
                </Radio.Button>

                <Radio.Button value="missing">
                    {locales.missing} <Badge style={styles.badge} count={list.filter(isMissing).length} />
                </Radio.Button>

                <Radio.Button value="anomaly">
                    {locales.anomaly} <Badge style={styles.badge} count={list.filter(isAnomaly).length} />
                </Radio.Button>

                <Radio.Button value="success">
                    {locales.success} <Badge style={styles.badge} count={list.filter(isSuccess).length} />
                </Radio.Button>
            </Radio.Group>
        </>
    );
}