//Types
import { TFormType } from "@/components/UserComponents/types";

//Components
import Button from "../GeneralComponents/Button";
import FormInputBoxes from "../FormComponents/FormInputBoxes";
import InputLabelContainer from "../FormComponents/InputLabelContainer";
import CenterElementsContainer from "../GeneralContainers/CenterElementsContainer";
import Title1 from "../GeneralComponents/Title1";

const UserForm = ({
  formType,
  onSubmit,
  onInputChange,
  formData,
  disabled,
}: TFormType) => {
  return (
    <form onSubmit={onSubmit}>
      <CenterElementsContainer>
        <Title1>{formType}</Title1>
        {(formType === "Sign up" || formType === "") && (
          <InputLabelContainer>
            <label htmlFor="name">Name</label>
            <FormInputBoxes
              onChange={onInputChange}
              value={formData.name}
              name="name"
              required
              disabled={disabled}
            />
          </InputLabelContainer>
        )}
        <InputLabelContainer>
          <label htmlFor="email">Email</label>
          <FormInputBoxes
            onChange={onInputChange}
            value={formData.email}
            type="email"
            name="email"
            required
            disabled={disabled}
          />
        </InputLabelContainer>
        {formType !== "" && (
          <InputLabelContainer>
            <label htmlFor="password">Password</label>
            <FormInputBoxes
              onChange={onInputChange}
              value={formData.password}
              type="password"
              name="password"
              required
              disabled={disabled}
            />
          </InputLabelContainer>
        )}
        {!disabled && <Button>Submit</Button>}
      </CenterElementsContainer>
    </form>
  );
};

export default UserForm;
