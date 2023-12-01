import React, { useState } from 'react';
import { Button, Select, Input, Tooltip, Modal } from 'antd';
import { FormOutlined, InfoCircleFilled, CloseOutlined, CheckOutlined } from '@ant-design/icons';

import "./staffReview.css";
import TableInfo from './tableInfo';

const StaffReview: React.FC = () => {

    const [isShowForm, setIsShowForm] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { TextArea } = Input;

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onChange = (value: string) => {
        console.log(`selected ${value}`);
        setIsShowForm(false)
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
    };

    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const handleShowForm = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        setIsShowForm(true)
    }

    return (<>
        <div className="staff-review_root">
            <div className="staff-info_container">
                <div className="staff-info_text">
                    Đánh giá nhân viên
                </div>
                <div className='staff-info_select-container'>
                    <div>
                        <div className='staff-info_select-text'>
                            Nhân viên được đánh giá:
                        </div>
                        <Select
                            style={{ width: 300 }}
                            showSearch
                            placeholder="--Chọn nhân viên--"
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            filterOption={filterOption}
                            options={[
                                {
                                    value: '222037 - Nguyễn Chí Lợi',
                                    label: '222037 - Nguyễn Chí Lợi',
                                },
                                {
                                    value: '227358 - Nguyễn Xuân Tiến',
                                    label: '227358 - Nguyễn Xuân Tiến',
                                },
                                {
                                    value: '227451 - Đạt Villa',
                                    label: '227451 - Đạt Villa',
                                },
                            ]}
                        />
                    </div>
                    <div className='staff-info_review-btn'>
                        <Button
                            type="primary"
                            icon={<FormOutlined />}
                            onClick={handleShowForm}
                        >
                            Chi tiết bài đánh giá
                        </Button>
                    </div>
                </div>
            </div>
            {
                isShowForm &&
                <div className="staff-review_container">
                    <div className='staff-review_header'>
                        Chi tiết bài đánh giá
                    </div>
                    <div className='staff-review_form'>
                        <div className='staff-review_form-item'>
                            <div className='staff-review_form-item-title'>
                                <span>
                                    Tiêu chí:
                                </span>
                                <span className='staff-review_form-item-title-name'>
                                    Tên tiêu chí
                                </span>
                                <Tooltip
                                    placement="top"
                                    title={'Xem mô tả tiêu chí'}
                                    color='blue'
                                >
                                    <InfoCircleFilled
                                        className='staff-review_form-item-title-info'
                                        onClick={showModal}
                                    />
                                </Tooltip>
                            </div>
                            <Modal
                                open={isModalOpen}
                                width={1500}
                                style={{ padding: 50 }}
                                onCancel={handleCancel}
                                footer={
                                    <Button
                                        key="close"
                                        type='primary'
                                        danger
                                        icon={<CloseOutlined />}
                                        onClick={handleCancel}
                                    >
                                        Đóng
                                    </Button>
                                }
                            >
                                <div>
                                    <div className='staff-review_form-item-modal-title'>
                                        Mô tả
                                    </div>
                                    <div className='staff-review_form-item-modal-subtitle'>
                                        <span>
                                            Tiêu chí:
                                        </span>
                                        <span className='staff-review_form-item-modal-name'>
                                            Tên tiêu chí
                                        </span>
                                    </div>
                                    <div>
                                        <div className='staff-review_form-item-modal-note'>
                                            *Bảng mô tả tiêu chí
                                        </div>
                                        <TableInfo />
                                    </div>
                                </div>
                            </Modal>
                            <div className='staff-review_form-item-input'>
                                <span>
                                    Điểm đánh giá:
                                </span>
                                <Input
                                    placeholder="Nhập điểm đánh giá"
                                />
                            </div>
                            <div className='staff-review_form-item-input'>
                                <span>
                                    Nhận xét:
                                </span>
                                <TextArea
                                    rows={5}
                                    placeholder="Nhập nhận xét"
                                />
                            </div>
                        </div>
                        <div className='staff-review_form-item'>
                            <div className='staff-review_form-item-title'>
                                <span>
                                    Tiêu chí:
                                </span>
                                <span className='staff-review_form-item-title-name'>
                                    Tên tiêu chí
                                </span>
                                <Tooltip
                                    placement="top"
                                    title={'Xem mô tả tiêu chí'}
                                    color='blue'
                                >
                                    <InfoCircleFilled className='staff-review_form-item-title-info' />
                                </Tooltip>                            </div>
                            <div className='staff-review_form-item-input'>
                                <span>
                                    Điểm đánh giá:
                                </span>
                                <Input
                                    placeholder="Nhập điểm đánh giá"
                                />
                            </div>
                            <div className='staff-review_form-item-input'>
                                <span>
                                    Nhận xét:
                                </span>
                                <TextArea
                                    rows={5}
                                    placeholder="Nhập nhận xét"
                                />
                            </div>
                        </div>
                    </div>
                    <div className='staff-review_btn'>
                        <Button
                            type="primary"
                            danger
                            icon={<CloseOutlined />}
                        >
                            Huỷ
                        </Button>
                        <Button
                            type="primary"
                            icon={<CheckOutlined />}
                            style={{ marginLeft: 30 }}
                        >
                            Đánh giá
                        </Button>
                    </div>
                </div>

            }

        </div>
    </>);
}

export default StaffReview;
