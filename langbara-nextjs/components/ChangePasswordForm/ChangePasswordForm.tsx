import { useForm, SubmitHandler } from "react-hook-form";
import {
  StyledForm,
  YellowButton,
} from "../../styles/register/register.styles";
import FormField from "../FormField/FormField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangePasswordFormValues } from "../../types/changePasswordFromValues";
import Router  from "next/router";

interface ChangePasswordFormProps {
  onSubmitBackendResponse: (
    userData: ChangePasswordFormValues
  ) => Promise<Response>;
  onSuccessBackendResponse: () => void;
}

const ChangePasswordForm = ({
  onSubmitBackendResponse,
  onSuccessBackendResponse,
}: ChangePasswordFormProps) => {
  const formSchema = yup.object().shape({
    oldPassword: yup.string().required("Stare hasło jest wymagane!"),
    newPassword: yup.string().required("Nowe hasło jest wymagane!"),
    confirmNewPassword: yup
      .string()
      .required("Potwierdzenie hasła jest wymagane!")
      .oneOf([yup.ref("newPassword")], "Hasła się nie zgadzają!"),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    mode: "onSubmit",
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<ChangePasswordFormValues> = async (
    userData: ChangePasswordFormValues
  ) => {
    const response = await onSubmitBackendResponse(userData);
    const apiCode = response.headers.get("api-code");
    
    if (apiCode === "1001") {
      setError("oldPassword", {
        type: "server",
        message: "Za długie hasło!",
      });
    } else if (apiCode === "5001") {
      setError("oldPassword", {
        type: "server",
        message: "Niepoprawne stare hasło!",
      });
    } else if (apiCode === "3004") {
      Router.push("/");
    } else if (apiCode === "0") {
      onSuccessBackendResponse();
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormField
        {...register("oldPassword", { required: true })}
        placeholder="Stare hasło"
        type="password"
        error={errors.oldPassword}
      />
      <FormField
        {...register("newPassword", { required: true })}
        placeholder="Nowe hasło"
        type="password"
        error={errors.newPassword}
      />
      <FormField
        {...register("confirmNewPassword", { required: true })}
        placeholder="Potwierdź nowe hasło"
        type="password"
        error={errors.confirmNewPassword}
      />
      <YellowButton type="submit">Zmień hasło</YellowButton>
    </StyledForm>
  );
};

export default ChangePasswordForm;
