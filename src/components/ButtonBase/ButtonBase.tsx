import { Button } from 'antd';
import "./ButtonBase.scss"

interface ButtonBaseIProps {
    className?: string | "btn_add" | "btn_delete" | "btn_detail" | "btn_edit";
    label?: string;
    onClick?: (e?: any) => void;
    onKeyUp?: (e?: any) => void;
    isButton?: boolean;
    icon?: any;
    url?: string;
    htmlType?: any;
    disabled?: boolean;
    loading?: boolean;
    style?: any;
    ref?: any;
    href?: string;
}
const ButtonBase = (props: ButtonBaseIProps) => {
    const {
        className,
        label,
        onClick,
        onKeyUp,
        icon,
        htmlType,
        disabled,
        loading,
        style,
        ref,
        href, } = props;
    return (
        <Button
            className={`btn_table ${className ? className : ''}`}
            onClick={onClick}
            onKeyUp={onKeyUp}
            icon={icon}
            htmlType={htmlType ? htmlType : 'button'}
            disabled={disabled}
            loading={loading}
            style={style}
            ref={ref}
            href={href}
        >
            {label}
        </Button>
    )
}

export default ButtonBase;