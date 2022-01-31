import React, { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { Divider, Modal, Tag } from "antd";
import omit from "lodash/omit";
import isEmpty from "lodash/isEmpty";
import ErrorActions from "./ErrorActions";

export default forwardRef(({ locales, getError, onShowEvent, republish, markAsSuccess, refresh }, ref) => {
    const [visible, setVisible] = useState(false);
    const [list, setList] = useState([]);
    const [topic, setTopic] = useState("");
    const [subscription, setSubscription] = useState("");

    useImperativeHandle(ref, () => ({
        open(topic, subscription) {
            setTopic(topic);
            setSubscription(subscription);
            setVisible(true);
            getError({ topic, subscription }).then(setList);
        },
    }));

    const close = useCallback(() => {
        setVisible(false);
        setList([]);
    });

    return (
        <Modal visible={visible} onCancel={close} onOk={close} title={subscription} width={window.innerWidth * 0.7}>
            {list.slice(0, 5).map((item, index) => {
                const stack = item.error.stack;
                const error = omit(item.error, ["stack", "message"]);
                return (
                    <div key={index}>
                        <div style={{ display: "flex" }}>
                            <div style={{ flex: "auto" }}>
                                <strong>{item.count}</strong>
                                <Divider type="vertical" /> <span>{item._id}</span>
                            </div>
                            <div style={{ flex: "auto", textAlign: "right"}}>
                                <ErrorActions
                                    locales={locales}
                                    topic={topic}
                                    subscription={subscription}
                                    events={item.eventIds}
                                    republish={republish}
                                    markAsSuccess={markAsSuccess}
                                    refresh={refresh}
                                />
                            </div>
                        </div>

                        <br />

                        <div>
                            <pre dangerouslySetInnerHTML={{ __html: stack }} />
                        </div>

                        <div>{!isEmpty(error) && <pre>{JSON.stringify(error, null, 2)}</pre>}</div>

                        <div style={{ display: "flex", overflow: "hidden" }}>
                            {item.eventIds.slice(0, 20).map(eventId => (
                                <Tag key={eventId} onClick={() => onShowEvent(eventId, { topic, subscription })}>
                                    ..{eventId.substr(-4)}
                                </Tag>
                            ))}
                        </div>

                        <Divider />
                    </div>
                );
            })}
        </Modal>
    );
});
