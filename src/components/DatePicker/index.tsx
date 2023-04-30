import { DatePicker as Date } from 'rsuite';
interface DatePickerProps {
    className: string;
    placeholder: string;
    onChange: (props: any) => void;
    disabled: boolean
}

const DatePicker = (props: DatePickerProps) => {
    const { className, placeholder, onChange, disabled } = props;
    return (
        <Date
            className={className}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
        />
    );
};

export default DatePicker;
