import { TFormType } from "@/components/UserForm/types";

//Components
import Button from "../Button";
import FormInputBoxes from "../FormComponents/FormInputBoxes";
import FormLabels from "../FormComponents/FormLabels";
import InputLabelContainer from "../FormComponents/InputLabelContainer";
import CenterElementsContainer from "../GeneralContainers/CenterElementsContainer";
import Title1 from "../Titles/Title1";

const UserForm = ({
  formType,
  onSubmit,
  onInputChange,
  formData,
  disabled
}: TFormType) => {
  return (
    <form onSubmit={onSubmit}>
      <CenterElementsContainer>
        <Title1>{formType}</Title1>
        {(formType === "Sign up" ||
          formType === "") && (
            <InputLabelContainer>
              <FormLabels htmlFor="name">Name</FormLabels>
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
          <FormLabels htmlFor="email">Email</FormLabels>
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
            <FormLabels htmlFor="password">Password</FormLabels>
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
