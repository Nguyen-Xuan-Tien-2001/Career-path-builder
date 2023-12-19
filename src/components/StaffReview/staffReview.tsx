import React, { useEffect, useState } from "react";
import { Button, Select, Input, Tooltip, Modal, Form, Space } from "antd";
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
    GetAllResultReviewByAssessoridReviewid,
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

interface IResult {
    assessmenttime: string;
    assessorid: number;
    criteriaid: number;
    note: string;
    point: number;
    reviewid: number;
    reviewresultid: number;
    userid: number;
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
    const [result, setResult] = useState<Array<IResult>>();

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
        async function fetchDataResultReview() {
            if (selectedReview) {
                const res = await GetAllResultReviewByAssessoridReviewid(
                    1, //current user id
                    selectedReview
                );
                const data = res?.data?.data;
                const resUser = data?.find(
                    (item: IResult) => item.userid === selectedUser?.userid
                );
                setResult(resUser?.reviewResults);
            }
        }
        if (selectedUser) {
            fetchDataResultReview();
            setIsShowForm(true);
        }
    };

    const onFinish = (values: object) => {
        const reviewResult = {
            assessmenttime: new Date().toISOString().slice(0, 19) + "Z",
            reviewid: selectedReview,
            userid: selectedUser?.userid,
        };

        const detail = [];

        const keys = Object.keys(values);
        const vals: string[] = Object.values(values);
        for (let i = 0; i < keys.length; i += 2) {
            if (keys[i].includes("point")) {
                const id = parseInt(keys[i].split("point")[0]);
                const temp = {
                    criteriaid: id,
                    point: parseFloat(vals[i]),
                    note: vals[i + 1],
                    accessorid: 1, //current user id
                    reviewresultid: selectedReview,
                };
                detail.push(temp);
            }
        }

        //add  review result
        console.log("review result", reviewResult);
        console.log("detail", detail);
    };

    const onFinishFailed = (errorInfo: object) => {
        console.log("Failed:", errorInfo);
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
                    1, //current user id
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
                                    value={
                                        selectedUser
                                            ? `${selectedUser?.userid} - ${selectedUser?.staffname}`
                                            : undefined
                                    }
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
                            <Form
                                name="staff-review_form"
                                layout="horizontal"
                                style={{ maxWidth: 1200 }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                {criterias &&
                                    criterias?.map((item: ICriteria) => {
                                        return (
                                            <Form.Item key={item?.criteriaid}>
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
                                                            title={
                                                                "Xem mô tả tiêu chí"
                                                            }
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
                                                    <Form.Item
                                                        name={`${item?.criteriaid}point`}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    "Vui lòng nhập điểm đánh giá!",
                                                            },
                                                            () => ({
                                                                validator(
                                                                    _,
                                                                    value
                                                                ) {
                                                                    if (
                                                                        parseFloat(
                                                                            value
                                                                        ) <=
                                                                            10 &&
                                                                        parseFloat(
                                                                            value
                                                                        ) >= 0
                                                                    ) {
                                                                        return Promise.resolve();
                                                                    }
                                                                    return Promise.reject(
                                                                        "Vui lòng nhập điểm đánh giá từ 0 đến 10!"
                                                                    );
                                                                },
                                                            }),
                                                        ]}
                                                    >
                                                        <div className="staff-review_form-item-input">
                                                            <span>
                                                                Điểm đánh giá:
                                                            </span>
                                                            <Input
                                                                placeholder="Nhập điểm đánh giá"
                                                                value={
                                                                    result
                                                                        ? result.find(
                                                                              (
                                                                                  ires: IResult
                                                                              ) =>
                                                                                  ires.criteriaid ===
                                                                                  item.criteriaid
                                                                          )
                                                                              ?.point
                                                                        : undefined
                                                                }
                                                            />
                                                        </div>
                                                    </Form.Item>
                                                    <Form.Item
                                                        name={`${item?.criteriaid}note`}
                                                    >
                                                        <div className="staff-review_form-item-input">
                                                            <span>
                                                                Nhận xét:
                                                            </span>
                                                            <TextArea
                                                                rows={5}
                                                                placeholder="Nhập nhận xét"
                                                                value={
                                                                    result
                                                                        ? result.find(
                                                                              (
                                                                                  ires: IResult
                                                                              ) =>
                                                                                  ires.criteriaid ===
                                                                                  item.criteriaid
                                                                          )
                                                                              ?.note
                                                                        : undefined
                                                                }
                                                            />
                                                        </div>
                                                    </Form.Item>
                                                </div>
                                            </Form.Item>
                                        );
                                    })}
                                <Form.Item>
                                    <Space style={{ marginLeft: 300 }}>
                                        <Button
                                            type="primary"
                                            danger
                                            icon={<CloseOutlined />}
                                            onClick={() => {
                                                setIsShowForm(false);
                                            }}
                                        >
                                            Huỷ
                                        </Button>
                                        <Button
                                            type="primary"
                                            icon={<CheckOutlined />}
                                            style={{ marginLeft: 30 }}
                                            htmlType="submit"
                                            disabled={!!result}
                                        >
                                            Đánh giá
                                        </Button>
                                    </Space>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default StaffReview;
