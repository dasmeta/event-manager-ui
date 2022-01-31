import React, { useRef, useMemo } from "react";
import { Col, Divider, List, Row, Table, Typography } from "antd";
import { CoffeeOutlined, UnorderedListOutlined } from "@ant-design/icons"
import { isError, isFail, isPreconditionFail, isMissing, isAnomaly, isSuccess } from "../../utils/helper";
import ErrorModal from "./ErrorModal";
import EventModal from "./EventModal";
import ItemStatusTags from "./ItemStatusTags";
import CalculateSingleAction from "./CalculateSingleAction";
import CleanAnomalyAction from "./CleanAnomalyAction";
import FixMissingAction from "./FixMissingAction";
import Fail from "./ItemInfo/Fail";
import Missing from "./ItemInfo/Missing";
import Anomaly from "./ItemInfo/Anomaly";
import MarkAsFail from "./ItemInfo/MarkAsFail";
import Republish from "./ItemInfo/Republish";
import formatMoney from "../../utils/format-number";
import styles from "../../styles";

const { Paragraph } = Typography;

export default React.memo(({
    options,
    locales,
    loading,
    refresh,
    list,
    filterKey,
    getError,
    getEvent,
    calculateSingleStats,
    republishSingleError,
    republishError,
    republishFail,
    republishPreconditionFail,
    markSingleAsSuccess,
    markAsSuccess,
    markAsFail,
    populateMissing,
    fixMissing,
    cleanAnomaly,
    updateEvent
}) => {

    const errorModal = useRef(null);
    const eventModal = useRef(null);

    const handleShowErrors = ({ topic, subscription }) => {
        errorModal.current.open(topic, subscription);
    };

    const handleShowEvent = (eventId, { topic, subscription }) => {
        eventModal.current.open(eventId, topic, subscription);
    };

    const columns = [
        {
            key: "topic",
            dataIndex: "topic",
            render: (topic, item) => renderItem(item, "topic"),
        },
        {
            type: "action",
            key: "action",
            width: 180,
            render: (action, item) => {

                const {topic, subscription} = item;

                return (
                    <div key={`action-${item._id}`}>
                        <div>
                            <CalculateSingleAction
                                locales={locales}
                                calculateStats={calculateSingleStats}
                                subscription={subscription}
                                topic={topic}
                                refresh={refresh} />
                        </div>

                        <div>
                            <Republish
                                title="Republish fails for this subscription?"
                                subscription={subscription}
                                topic={topic}
                                republish={republishFail}
                                refresh={refresh}
                                buttonText={locales.republishFail}
                            />
                        </div>

                        <div>
                            <Republish
                                title="Republish errors for this subscription?"
                                subscription={subscription}
                                topic={topic}
                                republish={republishError}
                                refresh={refresh}
                                buttonText={locales.republishError}
                            />
                        </div>

                        <div>
                            <Republish
                                title="Republish precondition fails for this subscription?"
                                subscription={subscription}
                                topic={topic}
                                republish={republishPreconditionFail}
                                refresh={refresh}
                                buttonText={locales.republishPreconditionFail}
                            />
                        </div>

                        <div>
                            <CleanAnomalyAction item={item} cleanAnomaly={cleanAnomaly} refresh={refresh} locales={locales} />
                        </div>

                        <div>
                            <FixMissingAction item={item} fixMissing={fixMissing} refresh={refresh} locales={locales} />
                        </div>

                        <div>
                            <a
                                href={`https://console.cloud.google.com/functions/details/${options.googleZone}/${
                                    item.subscription
                                }?project=${options.googleProjectId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <CoffeeOutlined /> Function
                            </a>
                        </div>

                        <div>
                            <a
                                href={`https://console.cloud.google.com/logs/viewer?project=${
                                    options.googleProjectId
                                }&minLogLevel=0&expandAll=false&resource=cloud_function%2Ffunction_name%2F${
                                    item.subscription
                                }`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <UnorderedListOutlined /> Logs
                            </a>
                        </div>
                        <div>
                            <MarkAsFail item={item} markAsFail={markAsFail} refresh={refresh} />
                        </div>
                    </div>
                );
            },
        },
    ];

    const renderItem = (item, name) => {

        return (
            <List.Item.Meta
                key={`${name}-${item._id}`}
                description={
                    <>
                        <ItemStatusTags item={item} locales={locales} />
                        <Row gutter={8}>
                            <Col md={6}>
                                <Paragraph copyable={{ text: item.topic }}>
                                    <small>{locales.topic}</small> {item.topic}
                                </Paragraph>
                            </Col>
                            <Col md={18}>
                                <Paragraph copyable={{ text: item.subscription }}>
                                    <small>{locales.subscription}</small> {item.subscription}
                                </Paragraph>
                            </Col>
                        </Row>

                        <div>
                            {locales.success}: <span style={styles.success}>{formatMoney(item.success)}</span>
                            {isError(item) && (
                                <>
                                    <Divider type="vertical" />
                                    {locales.error}:{" "}
                                    <a style={styles.error} onClick={() => handleShowErrors(item)}>
                                        {formatMoney(item.error)}
                                    </a>
                                </>
                            )}
                            {isPreconditionFail(item) && (
                                <Fail
                                    count={item.preconditionFail}
                                    title={locales.preconditionFail}
                                    type="preconditionFail"
                                    topic={item.topic}
                                    subscription={item.subscription}
                                    markAsSuccess={markAsSuccess}
                                    refresh={refresh}
                                />
                            )}
                            {isFail(item) && (
                                <Fail
                                    count={item.fail}
                                    title={locales.fail}
                                    type="fail"
                                    topic={item.topic}
                                    subscription={item.subscription}
                                    markAsSuccess={markAsSuccess}
                                    refresh={refresh}
                                />
                            )}
                            <Missing
                                item={item}
                                locales={locales}
                                populateMissing={populateMissing}
                                refresh={refresh}
                            />
                            <Anomaly item={item} locales={locales} cleanAnomaly={cleanAnomaly} refresh={refresh} />
                        </div>
                        <div>
                            {locales.topic}: {formatMoney(item.topicCount)}
                            <Divider type="vertical" />
                            {locales.subscription}: {formatMoney(item.subscriptionCount)}
                        </div>
                    </>
                }
            />
        );
    };
    
    const filter = item => {
        if (!filterKey) {
            return true;
        }
        if (filterKey === "error") {
            return isError(item);
        }
        if (filterKey === "fail") {
            return isFail(item);
        }
        if (filterKey === "preconditionFail") {
            return isPreconditionFail(item);
        }
        if (filterKey === "missing") {
            return isMissing(item);
        }
        if (filterKey === "anomaly") {
            return isAnomaly(item);
        }
        if (filterKey === "success") {
            return isSuccess(item);
        }
        if (filterKey.substr(0, 1) === "=") {
            return item.topic === filterKey.substr(1) || item.subscription === filterKey.substr(1);
        }
        return item.topic && item.topic.includes(filterKey) || item.subscription && item.subscription.includes(filterKey);
    };


    return (
        <>
            <Table
                rowKey="_id"
                size="middle"
                rowClassName="no-hover-row"
                loading={loading}
                columns={columns}
                dataSource={list.filter(filter)}
                pagination={false}
                showHeader={false}
            />

            <ErrorModal
                locales={locales}
                ref={errorModal}
                getError={getError}
                onShowEvent={handleShowEvent}
                republish={republishSingleError}
                markAsSuccess={markSingleAsSuccess}
                refresh={refresh}
            />
            <EventModal
                locales={locales}
                ref={eventModal}
                getEvent={getEvent}
                updateEvent={updateEvent}
                republish={republishSingleError}
                markAsSuccess={markSingleAsSuccess}
                refresh={refresh}
            />
        </>
    );
})