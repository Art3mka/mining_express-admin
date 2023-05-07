import { DatePicker as Date } from 'rsuite';
interface DatePickerProps {
    className: string;
    placeholder: string;
    onChange: (props: any) => void;
    disabled?: boolean;
    value?: any;
    defaultValue?: any
}

const DatePicker = (props: DatePickerProps) => {
    const { className, placeholder, onChange, disabled, defaultValue } = props;
    return (
        <Date
            {...props}
            className={className}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            defaultValue={defaultValue}
        />
    );
};

export default DatePicker;
