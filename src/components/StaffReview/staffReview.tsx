import React, { useEffect, useState } from "react";
import {
    Button,
    Select,
    Input,
    Tooltip,
    Modal,
    Form,
    Space,
    Spin,
    message,
} from "antd";
import {
    FormOutlined,
    InfoCircleFilled,
    CloseOutlined,
    CheckOutlined,
    HomeOutlined,
    CaretRightOutlined,
    LoadingOutlined,
} from "@ant-design/icons";

import "./staffReview.css";
import TableInfo from "./tableInfo";

import {
    GetAllReview,
    GetAllUserByAssessoridReviewid,
    GetAllCriterialByPath,
    GetAllResultReviewByAssessoridReviewid,
    AddReviewResult,
    AddReviewResultDetail,
    GetAllReviewDetailByUserId,
} from "./../../ApiServices/StaffReviewApi";
import moment from "moment";

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

interface IReviewResult {
    assessmenttime: string;
    reviewresult: number;
    reviewid?: number;
    userid?: number;
}

interface IReviewResultDetail {
    accessorid: number;
    criteriaid: number;
    note: string;
    point: number;
    reviewresultid: number;
}

interface IRV {
    userId: number;
    staffName: string;
    gender: boolean;
    dateOfBirth: string;
    department: string;
    positionJob: string;
    reviewResultsId: number;
    assessmentTime: string;
    reviewreult: number;
    reviewId: number;
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
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();

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
        setIsSuccess(false);
    };

    const onChangeReview = (value: string) => {
        setIsShowForm(false);
        setSelectedReview(parseInt(value));
        setUsers([]);
        setSelectedUser(undefined);
        setIsSuccess(false);
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
                    3, //current user id
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
        setIsSubmitting(true);

        async function fetchDataResultReviewID() {
            return await GetAllReviewDetailByUserId(selectedUser?.userid);
        }

        const reviewResult: IReviewResult = {
            assessmenttime: moment(new Date()).format("YYYY-MM-DD"),
            reviewresult: 0,
            reviewid: selectedReview,
            userid: selectedUser?.userid,
        };
        //add  review result
        async function addReviewResult() {
            const data = await fetchDataResultReviewID();
            const result = data?.data?.data?.filter(
                (item: IRV) =>
                    item.reviewId === selectedReview &&
                    item.userId === selectedUser?.userid
            );
            let rid: number = 0;
            if (result[0]?.reviewResultsId > 0) {
                rid = result[0]?.reviewResultsId;
            } else {
                const res = await AddReviewResult(reviewResult);
                rid = parseInt(res?.data?.data);
            }
            console.log(rid);
            const detail: IReviewResultDetail[] = [];

            const keys = Object.keys(values);
            const vals: string[] = Object.values(values);
            for (let i = 0; i < keys.length; i += 2) {
                if (keys[i].includes("point")) {
                    const id = parseInt(keys[i].split("point")[0]);
                    const temp = {
                        criteriaid: id,
                        point: parseFloat(vals[i]),
                        note: vals[i + 1] ? vals[i + 1] : "",
                        accessorid: 3, //current user id
                        reviewresultid: rid,
                    };
                    detail.push(temp);
                }
            }

            //add review result detail
            async function addReviewResultDetail() {
                const res = await AddReviewResultDetail(detail);
                if (!res?.data?.errorcode) {
                    setIsSuccess(true);
                    success();
                } else {
                    error();
                }
            }
            addReviewResultDetail();
        }
        addReviewResult();

        setIsSubmitting(false);
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
                    3, //current user id
                    selectedReview
                );
                setUsers(
                    res?.data?.data.sort(
                        (a: IUser, b: IUser) => a.userid - b.userid
                    )
                );
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

    const success = () => {
        messageApi.open({
            type: "success",
            content: `Đánh giá ${selectedUser?.userid} - ${selectedUser?.staffname} thành công!`,
        });
    };

    const error = () => {
        messageApi.open({
            type: "error",
            content: `Đánh giá ${selectedUser?.userid} - ${selectedUser?.staffname} thất bại!`,
        });
    };

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
                                            label: `${item?.userid} - ${item?.staffname}`,
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
                {contextHolder}
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
                                            disabled={isSubmitting}
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
                                            disabled={
                                                !!result ||
                                                isSubmitting ||
                                                isSuccess
                                            }
                                        >
                                            Đánh giá
                                            {isSubmitting && (
                                                <Spin
                                                    indicator={
                                                        <LoadingOutlined
                                                            style={{
                                                                fontSize: 24,
                                                            }}
                                                            spin
                                                        />
                                                    }
                                                />
                                            )}
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
