import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { Divider, Modal, Typography, Input, message } from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import ErrorActions from "./ErrorActions";

const { Paragraph } = Typography;

export default forwardRef(({ locales, getEvent, updateEvent, republish, markAsSuccess, refresh }, ref) => {
    const [visible, setVisible] = useState(false);
    const [event, setEvent] = useState({});
    const [eventId, setEventId] = useState("");
    const [topic, setTopic] = useState("");
    const [subscription, setSubscription] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [value, setValue] = useState(null);

    useEffect(() => {
        if (!eventId) {
            return;
        }
        getEvent(eventId).then(setEvent);
    }, [eventId]);

    useImperativeHandle(ref, () => ({
        open(eventId, topic, subscription) {
            setEventId(eventId);
            setTopic(topic);
            setSubscription(subscription);
            setVisible(true);
        },
    }));

    const close = useCallback(() => {
        setVisible(false);
        setEvent({});
        setEventId("");
        setEditMode(false);
    });

    const activateEditMode = useCallback(() => {
        setEditMode(true);
        setValue(JSON.stringify(event.data || {}, null, 2));
    });

    const deActivateEditMode = useCallback(() => {
        setEditMode(false);
    });

    const handleChange = useCallback((e) => {
        setValue(e.target.value);
    });

    const saveEventData = useCallback(async () => {
        let data = null;
        try {
            data = JSON.parse(value);
        } catch(e) {
            message.error('Wrong JSON format');
            return;
        }
        await updateEvent(eventId, data);
        setEvent({...event, data});
        setEditMode(false);
    });

    return (
        <Modal visible={visible} onCancel={close} onOk={close} title={eventId} width={window.innerWidth * 0.7}>
            <div style={{ display: "flex" }}>
                <div style={{ flex: "auto" }}>
                    <Paragraph copyable={{ text: JSON.stringify(event.data || {}, null, 2) }}>Copy Event Data</Paragraph>
                    <Paragraph copyable={{ text: topic }}> topic: {topic}</Paragraph>
                    <Paragraph copyable={{ text: subscription }}> subscription: {subscription}</Paragraph>
                </div>
                <div style={{ flex: "auto", textAlign: "right" }}>
                    <ErrorActions
                        locales={locales}
                        topic={topic}
                        subscription={subscription}
                        events={[eventId]}
                        republish={republish}
                        markAsSuccess={markAsSuccess}
                        refresh={refresh}
                    />
                </div>
            </div>
            <Divider />
            <div>
                <div style={{ flex: "auto", textAlign: "right" }}>
                    {editMode ? (
                        <>
                            <a onClick={deActivateEditMode}>
                                <CloseOutlined /> {locales.cancel}
                            </a>
                            <Divider type="vertical" />
                            <a onClick={saveEventData}>
                                <SaveOutlined /> {locales.save}
                            </a>
                        </>
                    ) : (
                        <a onClick={activateEditMode}>
                            <EditOutlined /> {locales.edit}
                        </a>
                    )
                    }
                </div>
                {editMode ?
                    <Input.TextArea rows={15} value={value} onChange={handleChange} /> :
                    <pre>{JSON.stringify(event, null, 2)}</pre>
                }
            </div>
        </Modal>
    );
});
