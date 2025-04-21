import { useField } from "formik";
import { FormField, Label } from "semantic-ui-react";
import DatePicker, {ReactDatePickerCustomHeaderProps} from 'react-datepicker';

interface MyDateInputProps extends Partial<ReactDatePickerCustomHeaderProps> {
    name: string;
    placeholderText?: string;
    showTimeSelect?: boolean;
    timeCaption?: string;
    dateFormat?: string;
}

export default function MyDateInput(props: MyDateInputProps) {
    const [field, meta, helpers] = useField(props.name);
    return (
        <FormField error={meta.touched && !!meta.error}>
            <DatePicker
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </FormField>
    )
}