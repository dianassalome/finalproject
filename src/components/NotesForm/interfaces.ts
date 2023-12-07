type TNotesFormData = {
  title: string;
  description: string;
}

type TNotesFormType = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> 
  formData: INotesFormData;
}

interface INotesFormData {
    title: string;
    description: string;
}

interface INotesFormType {
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    onInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> 
    formData: INotesFormData;
  }

export type {INotesFormData, INotesFormType, TNotesFormData}

// | React.ChangeEventHandler<HTMLTextAreaElement>;