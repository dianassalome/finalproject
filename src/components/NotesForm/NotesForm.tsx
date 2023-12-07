import { INotesFormType } from "./interfaces";

const NotesForm = ({ onSubmit, onInputChange, formData }: INotesFormType) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input onChange={onInputChange} value={formData.title} name="title" />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          onChange={onInputChange}
          value={formData.description}
          name="description"
        />
      </div>
      <button>Submit</button>
    </form>
  );
};

export default NotesForm;
