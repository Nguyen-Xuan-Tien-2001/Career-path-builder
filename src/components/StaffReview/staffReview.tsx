import React from 'react';
import { Button, Select } from 'antd';
import { FormOutlined } from '@ant-design/icons';

import "./staffReview.css";

const StaffReview: React.FC = () => {

    const onChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    
    const onSearch = (value: string) => {
        console.log('search:', value);
    };
    
    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    
    return (<>
        <div className="staff-review_root">
            <div className="staff-info_container">
                <div className="staff-info_text">
                    Đánh giá nhân viên
                </div>
                <div className='staff-info_select-container'>
                    <div className=''>
                        Nhân viên được đánh giá
                    </div>
                    <Select
                        style={{width:300}}
                        showSearch
                        placeholder="Chọn nhân viên"
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
                    >
                        Chi tiết bài đánh giá
                    </Button>
                </div>
            </div>
            <div className="staff-review_container">
                <div className='staff-review_header'>
                    Chi tiết bài đánh giá
                </div>
            </div>
        </div>
    </>);
}

export default StaffReview;
