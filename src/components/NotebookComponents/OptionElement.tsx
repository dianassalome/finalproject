type TSelectionData = {
  id: number;
  title: string;
};

const OptionElement = ({ id, title }: TSelectionData) => {
  return <option value={id}>{title}</option>;
};

export default OptionElement;
