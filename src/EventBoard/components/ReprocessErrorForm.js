// import React from "react";
// import { InputNumber, Form, Radio } from "antd";
// import { t } from "components/Translatable";
//
// const formItemLayout = {
//     labelCol: {
//         span: 6,
//     },
//     wrapperCol: {
//         span: 14,
//     },
// };
//
// class ReprocessErrorForm extends React.Component {
//     state = {
//         list: [],
//     };
//
//     async componentDidMount() {
//         const { init, form } = this.props;
//         init(form);
//         // await this.fetchData();
//     }
//
//     // fetchData = async () => {
//     //     const { subscription } = this.props;
//     //     const { list } = await getEventsErrors({ subscription });
//     //     this.setState({ list });
//     // };
//
//     render() {
//         const { form, subscription } = this.props;
//         return (
//             <Form layout="horizontal">
//                 {subscription ? (
//                     <Form.Item label={t("message")} {...formItemLayout}>
//                         {form.getFieldDecorator("message", {
//                             rules: [
//                                 {
//                                     required: false,
//                                 },
//                             ],
//                         })(
//                             <Radio.Group onChange={this.handleChange}>
//                                 {this.state.list.map((label, index) => (
//                                     <Radio key={index} value={label}>
//                                         {label}
//                                     </Radio>
//                                 ))}
//                             </Radio.Group>
//                         )}
//                     </Form.Item>
//                 ) : null}
//                 <Form.Item label={t("Count")} hasFeedback {...formItemLayout}>
//                     {form.getFieldDecorator("count", {
//                         initialValue: 10,
//                         rules: [
//                             {
//                                 required: true,
//                             },
//                         ],
//                     })(<InputNumber min={0} max={100} step={5} />)}
//                 </Form.Item>
//             </Form>
//         );
//     }
// }
//
// export default Form.create()(ReprocessErrorForm);
