import React, { useEffect, useState } from "react";
import { Button, Select, Input, Tooltip, Modal } from "antd";
import {
    FormOutlined,
    InfoCircleFilled,
    CloseOutlined,
    CheckOutlined,
    HomeOutlined,
    CaretRightOutlined,
} from "@ant-design/icons";

import "./staffReview.css";
import TableInfo from "./tableInfo";

import {
    GetAllReview,
    GetAllUserByAssessoridReviewid,
} from "./../../ApiServices/StaffReviewApi";

interface IReview {
    pathid: number;
    reviewid: number;
    reviewname: string;
    timeend: string;
    timestart: string;
}

const StaffReview: React.FC = () => {
    const [isShowForm, setIsShowForm] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<number>();
    const [selectedReview, setSelectedReview] = useState<number>();
    const [reviews, setReviews] = useState([]);
    const [users, setUsers] = useState([]);

    const { TextArea } = Input;

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onChange = (value: string) => {
        setIsShowForm(false);
        setSelectedUser(parseInt(value));
    };

    const onChangeReview = (value: string) => {
        setIsShowForm(false);
        setSelectedReview(parseInt(value));
        console.log("value", value);
        async function fetchData() {
            if (parseInt(value)) {
                const res = await GetAllUserByAssessoridReviewid(
                    1,
                    parseInt(value)
                );
                setUsers(res?.data);
            }
        }
        fetchData();
        console.log("users", users);
    };

    const filterOption = (
        input: string,
        option?: { label: string; value: string }
    ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

    const handleShowForm = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        if (selectedUser) {
            setIsShowForm(true);
        }
    };

    useEffect(() => {
        const currentDate = new Date();
        async function fetchData() {
            const res = await GetAllReview();
            const reviewTemp = res?.data?.data?.filter(
                (item: IReview) =>
                    new Date(item.timestart) <= currentDate &&
                    new Date(item.timeend) >= currentDate
            );
            setReviews(reviewTemp);
        }
        fetchData();
    }, []);

    // useEffect(() => {
    //     // const path = reviews?.find((item) => item.reviewid === selectedReview);
    //     // if (path) {
    //     //     const criterials = GetAllCriterialByPath(path.pathid);
    //     //     console.log("criterials", criterials);
    //     // }

    // }, [selectedReview]);

    return (
        <>
            <div className="staff-review_root">
                <div className="review_header">
                    <HomeOutlined className="icon_home" />
                    <CaretRightOutlined className="icon_navigateNext" />
                    <span>Thông tin nhân viên đánh giá</span>
                </div>
                <div className="staff-info_container">
                    <div className="staff-info_text">Đánh giá nhân viên</div>
                    <div className="staff-info_select-container">
                        <div className="staff-info_select-div">
                            <div>
                                <div className="staff-info_select-text">
                                    Đợt đánh giá:
                                </div>
                                <Select
                                    style={{ width: 350 }}
                                    showSearch
                                    placeholder="--Chọn đợt đánh giá--"
                                    optionFilterProp="children"
                                    onChange={onChangeReview}
                                    filterOption={filterOption}
                                    options={reviews?.map((item: IReview) => {
                                        return {
                                            value: item.reviewid.toString(),
                                            label: item.reviewname,
                                        };
                                    })}
                                />
                            </div>
                            <div>
                                <div className="staff-info_select-text">
                                    Nhân viên được đánh giá:
                                </div>
                                <Select
                                    style={{ width: 300 }}
                                    showSearch
                                    placeholder="--Chọn nhân viên--"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    filterOption={filterOption}
                                    options={[
                                        {
                                            value: "222037",
                                            label: "222037 - Nguyễn Chí Lợi",
                                        },
                                        {
                                            value: "227358",
                                            label: "227358 - Nguyễn Xuân Tiến",
                                        },
                                        {
                                            value: "227451",
                                            label: "227451 - Đạt Villa",
                                        },
                                    ]}
                                />
                            </div>
                        </div>

                        <div className="staff-info_review-btn">
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
                {isShowForm && (
                    <div className="staff-review_container">
                        <div className="staff-review_header">
                            Chi tiết bài đánh giá
                        </div>
                        <div className="staff-review_form">
                            <div className="staff-review_form-item">
                                <div className="staff-review_form-item-title">
                                    <span>Tiêu chí:</span>
                                    <span className="staff-review_form-item-title-name">
                                        Tên tiêu chí
                                    </span>
                                    <Tooltip
                                        placement="top"
                                        title={"Xem mô tả tiêu chí"}
                                        color="blue"
                                    >
                                        <InfoCircleFilled
                                            className="staff-review_form-item-title-info"
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
                                            type="primary"
                                            danger
                                            icon={<CloseOutlined />}
                                            onClick={handleCancel}
                                        >
                                            Đóng
                                        </Button>
                                    }
                                >
                                    <div>
                                        <div className="staff-review_form-item-modal-title">
                                            Mô tả
                                        </div>
                                        <div className="staff-review_form-item-modal-subtitle">
                                            <span>Tiêu chí:</span>
                                            <span className="staff-review_form-item-modal-name">
                                                Tên tiêu chí
                                            </span>
                                        </div>
                                        <div>
                                            <div className="staff-review_form-item-modal-note">
                                                *Bảng mô tả tiêu chí
                                            </div>
                                            <TableInfo />
                                        </div>
                                    </div>
                                </Modal>
                                <div className="staff-review_form-item-input">
                                    <span>Điểm đánh giá:</span>
                                    <Input placeholder="Nhập điểm đánh giá" />
                                </div>
                                <div className="staff-review_form-item-input">
                                    <span>Nhận xét:</span>
                                    <TextArea
                                        rows={5}
                                        placeholder="Nhập nhận xét"
                                    />
                                </div>
                            </div>
                            <div className="staff-review_form-item">
                                <div className="staff-review_form-item-title">
                                    <span>Tiêu chí:</span>
                                    <span className="staff-review_form-item-title-name">
                                        Tên tiêu chí
                                    </span>
                                    <Tooltip
                                        placement="top"
                                        title={"Xem mô tả tiêu chí"}
                                        color="blue"
                                    >
                                        <InfoCircleFilled className="staff-review_form-item-title-info" />
                                    </Tooltip>{" "}
                                </div>
                                <div className="staff-review_form-item-input">
                                    <span>Điểm đánh giá:</span>
                                    <Input placeholder="Nhập điểm đánh giá" />
                                </div>
                                <div className="staff-review_form-item-input">
                                    <span>Nhận xét:</span>
                                    <TextArea
                                        rows={5}
                                        placeholder="Nhập nhận xét"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="staff-review_btn">
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
                )}
            </div>
        </>
    );
};

export default StaffReview;
