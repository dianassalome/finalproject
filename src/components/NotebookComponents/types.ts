type TNotesFormData = {
  title: string;
  description: string;
}

type TNotesFormType = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> 
  formData: TNotesFormData;
}

//isto no fundo é o mesmo que o TBasicData mas sem o id
type TNotebookTileProps = {
  title: string;
  created_at: number;
  description: string;
};

type TBasicData = {
  id: number;
  created_at: number;
  title: string;
  description: string;
};

type TNotebook = TBasicData & {
  pins: [] | TPin[]
}

type TPin = TBasicData & {
  location: {
    type: string;
    data: {
      lng: number;
      lat: number;
    };
  };
};

interface INotesFormData {
    title: string;
    description: string;
}

interface INotesFormType {
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    onInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> 
    formData: INotesFormData;
  }

export type {INotesFormData, INotesFormType, TNotesFormData, TNotesFormType, TNotebookTileProps, TBasicData, TNotebook, TPin}
