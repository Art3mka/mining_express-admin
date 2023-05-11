import { SelectPicker } from 'rsuite';

interface DropDownProps {
    data: any;
    placeholder: string;
    props: any;
    defaultValue: any;
}

const DropDown = (props: any) => {
    const { data, placeholder, className, onChange, disabled } =
        props;
    return (
        <>
            <SelectPicker
                {...props}
                data={data}
                appearance="default"
                placeholder={placeholder}
                style={{ width: 224 }}
                className={className}
                onChange={onChange}
                disabled={disabled}
            />
        </>
    );
};

export default DropDown;
