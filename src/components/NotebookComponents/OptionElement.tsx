type TSelectionData = {
  id: number;
  title: string;
  selected: boolean
};

const OptionElement = ({ id, title, selected }: TSelectionData) => {
  return <option value={id} selected={selected}>{title}</option>;
};

export default OptionElement;
