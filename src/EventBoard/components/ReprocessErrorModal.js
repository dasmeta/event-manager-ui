// import React from "react";
// import { Modal } from "antd";
// // import ReprocessErrorForm from "./ReprocessErrorForm";
// import { republishError } from "services/settings/event";
//
// export default class extends React.Component {
//     state = {
//         visible: false,
//         subscribe: "",
//         confirmLoading: true,
//         form: null,
//     };
//
//     handleOk = () => {
//         const { onRefresh } = this.props;
//         const { subscription, topic } = this.state;
//
//         const { form } = this.state;
//         form.validateFields(async errors => {
//             if (errors) {
//                 return;
//             }
//             this.setState({ confirmLoading: true });
//
//             const data = {
//                 subscription,
//                 topic,
//                 ...form.getFieldsValue(),
//             };
//
//             await republishError(data);
//             await onRefresh();
//             this.close();
//         });
//     };
//
//     open = ({ subscription, topic }) => {
//         this.setState({ visible: true, confirmLoading: false, subscription, topic });
//     };
//
//     close = () => {
//         this.setState({ visible: false, confirmLoading: false });
//     };
//
//     render() {
//         const { visible, confirmLoading, loading, subscription, topic } = this.state;
//
//         return (
//             <Modal
//                 destroyOnClose
//                 visible={visible}
//                 title="Republish Error"
//                 onOk={this.handleOk}
//                 onCancel={this.close}
//                 confirmLoading={confirmLoading}
//                 maskClosable={false}
//             >
//                 <div>Topic: {topic}</div>
//                 <div>Subscription: {subscription}</div>
//
//                 {/*<ReprocessErrorForm*/}
//                 {/*    init={form => this.setState({ form })}*/}
//                 {/*    subscription={subscription}*/}
//                 {/*    topic={topic}*/}
//                 {/*    loading={loading}*/}
//                 {/*/>*/}
//             </Modal>
//         );
//     }
// }
