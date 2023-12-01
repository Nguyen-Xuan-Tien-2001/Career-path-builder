import React from 'react';
import { Button } from 'antd';

import "./staffReview.css";

function StaffReview() {
    return (<>
        <div className="staff_review-root">
            <div className="staff_info-container">
                <div className="staff_info-text">
                    Đánh giá nhân viên
                </div>
                <div className='staff_info-select'>
                    <div>

                        Nhân viên được đánh giá
                    </div>
                    <div>
                        Selectbox
                    </div>
                </div>
                <div>
                    <Button type="primary">Chi tiết bài đánh giá</Button>
                </div>
            </div>
            <div>
                
            </div>
            <div className="staff_review-container">

            </div>
        </div>
    </>);
}

export default StaffReview;
