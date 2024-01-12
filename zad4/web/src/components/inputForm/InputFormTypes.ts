export type CustomerData = {
    name: string;
    email: string;
    phoneNumber: string;
}

export type SetFormData = (data: CustomerData) => void;

export type InputFormProps = {
    setData: SetFormData;
}
