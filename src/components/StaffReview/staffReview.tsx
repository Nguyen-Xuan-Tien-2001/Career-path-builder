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
    GetAllCriterialByPath,
} from "./../../ApiServices/StaffReviewApi";

interface IReview {
    pathid: number;
    reviewid: number;
    reviewname: string;
    timeend: string;
    timestart: string;
}

interface IUser {
    assessorid: number;
    userid: number;
    staffname: string;
    ratingcoefficient: number;
    reviewid: number;
}

interface ICriteria {
    criteriaid: number;
    criterianame: string;
    unit: string;
    description: string;
    capacityid: number;
}

const StaffReview: React.FC = () => {
    const [isShowForm, setIsShowForm] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<IUser>();
    const [selectedReview, setSelectedReview] = useState<number>(0);
    const [reviews, setReviews] = useState<Array<IReview>>();
    const [users, setUsers] = useState([]);
    const [criterias, setCriterias] = useState([]);
    const [selectedCriteria, setSelectedCriteria] = useState<ICriteria>();

    const { TextArea } = Input;

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onChangeUser = (value: string) => {
        setIsShowForm(false);
        setSelectedUser(
            users?.find((item: IUser) => item.userid === parseInt(value))
        );
    };

    const onChangeReview = (value: string) => {
        setIsShowForm(false);
        setSelectedReview(parseInt(value));
        setUsers([]);
        setSelectedUser(undefined);
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

    useEffect(() => {
        async function fetchDataUser() {
            if (selectedReview) {
                const res = await GetAllUserByAssessoridReviewid(
                    1,
                    selectedReview
                );
                setUsers(res?.data?.data);
            }
        }
        async function fetchDataReview() {
            const path: IReview | undefined = reviews?.find(
                (item: IReview) => item?.reviewid === selectedReview
            );
            if (path) {
                const res = await GetAllCriterialByPath(path.pathid);
                setCriterias(res?.data?.data);
            }
        }
        fetchDataUser();
        fetchDataReview();
    }, [selectedReview, reviews]);

    useEffect(() => {
        if (users?.length < 0) {
            setSelectedUser(undefined);
        }
    }, [users]);

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
                                    onChange={onChangeUser}
                                    filterOption={filterOption}
                                    disabled={!users?.length}
                                    value={selectedUser?.staffname}
                                    options={users?.map((item: IUser) => {
                                        return {
                                            value: item.userid.toString(),
                                            label: item.staffname,
                                        };
                                    })}
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
                                            {selectedCriteria?.criterianame}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="staff-review_form-item-modal-note">
                                            *Bảng mô tả tiêu chí
                                        </div>
                                        <TableInfo
                                            criteria={selectedCriteria}
                                        />
                                    </div>
                                </div>
                            </Modal>
                            {criterias &&
                                criterias?.map((item: ICriteria) => {
                                    return (
                                        <div
                                            key={item?.criteriaid}
                                            className="staff-review_form-item"
                                        >
                                            <div className="staff-review_form-item-title">
                                                <span>Tiêu chí:</span>
                                                <span className="staff-review_form-item-title-name">
                                                    {item.criterianame}
                                                </span>
                                                <Tooltip
                                                    placement="top"
                                                    title={"Xem mô tả tiêu chí"}
                                                    color="blue"
                                                >
                                                    <InfoCircleFilled
                                                        className="staff-review_form-item-title-info"
                                                        onClick={() => {
                                                            setSelectedCriteria(
                                                                item
                                                            );
                                                            showModal();
                                                        }}
                                                    />
                                                </Tooltip>
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
                                    );
                                })}
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
