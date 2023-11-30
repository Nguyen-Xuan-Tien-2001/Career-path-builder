import { Col, Row, Space, Typography } from 'antd'
import './Footer.css'
const Footer = () => {
    const styled={
        color: 'rgb(255, 193, 7)', 
        letterSpacing: 2, 
        fontWeight: 'bolder', 
        fontFamily: 'BeVietnamPro,sans-serif'
    }
    return (
        <div className="footer">
            <div className='footer_content'>
                <Col span={12}>
                    <Col span={24}>
                        <Row>
                            <Typography.Title level={4} style={styled}>KHỐI TNKH</Typography.Title>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}><span>Chính sách của khối trải nghiệm khách hàng</span></Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row>
                            <Typography.Title level={4} style={styled}>CHÍNH SÁCH CHẾ ĐỘ NHÂN SỰ</Typography.Title>
                        </Row>
                        <Row>
                            <Space>
                                <span>Ốm đau</span>
                                <span>Thai sản nam</span>
                                <span>Thai sản nữ</span>
                                <span>Bảo hiểm sức khoẻ</span>
                                <span>Thất nghiệp</span>
                                <span>Thôi việc</span>
                                <span>Thuế TNCN-Đăng ký giảm trừ</span>
                            </Space>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row>
                        <Typography.Title level={4} style={styled}>NGHIỆP VỤ KHO VẬN</Typography.Title>
                        </Row>
                        <Row>
                            <Space>
                                <span>Tài liệu nghiệp vụ</span>
                                <span>Tiếp nhận sự cố vận chuyển</span>
                            </Space>
                        </Row>
                    </Col> 
                    <Col span={24}>
                        <Row>
                            <Typography.Title level={4} style={styled}>KẾ TOÁN</Typography.Title>
                        </Row>
                        <Row>
                            <Space>
                                <span>Cẩm nang cả thẻ POS</span>
                                <span>Chính sách công tác phí</span>
                                <span>Cẩm nang TT CP xe tải</span>
                            </Space>
                        </Row>
                    </Col> 
                    <Col span={24}>
                        <Row>
                            <Typography.Title level={4} style={styled}>NGÂN HÀNG MULTICAT</Typography.Title>
                        </Row>
                        <Row>
                            <Space>
                                <span>Sim số</span>
                                <span>Thẻ cào</span>
                                <span>Thu hộ</span>
                                <span>Chi hộ</span>
                                <span>Chuyển+giao tiền</span>
                                <span>Trả góp</span>
                                <span>DV tài chính và thanh toán</span>
                            </Space>
                        </Row>
                    </Col> 
                </Col>
            </div>
        </div>
    )
}
export default Footer