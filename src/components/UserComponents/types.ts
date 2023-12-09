type TFormData = {
  name?: string;
  email: string;
  password: string;
}

type TFormType = {
  formType: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  formData: TFormData;
  disabled: boolean;
}

export type { TFormData, TFormType };
