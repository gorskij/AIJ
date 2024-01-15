export type CustomerData = {
    name: string;
    email: string;
    phoneNumber: string;
}

export type FormSubmitted = (data: CustomerData) => void;

export type InputFormProps = {
    onFormSubmitted: FormSubmitted;
}
