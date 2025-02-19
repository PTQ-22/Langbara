import { NextPageContext } from "next";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import { getAdminData } from "../../logic/admin-cookies";
import {
  StyledForm,
  YellowButton,
} from "../../styles/register/register.styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import FormField from "../../components/FormField/FormField";
import { API_URL } from "../../data/constants";
import { useState } from "react";
import { StyledH2Message } from "../../components/WordForm/WordForm.styles";

const REGISTER_ADMIN_API_ENDPOINT = `${API_URL}/admin/register`;

interface AddAdminFormValues {
  name: string;
  passwd: string;
}

interface AddAdminProps {
  adminName: string;
}

const AddAdmin = ({ adminName }: AddAdminProps) => {
  const formSchema = yup.object().shape({
    name: yup.string().required("Login jest wymagany!"),
    passwd: yup.string().required("Hasło jest wymagane!"),
  });

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<AddAdminFormValues>({
    mode: "onSubmit",
    resolver: yupResolver(formSchema),
  });

  const [message, setMessage] = useState<string>("");

  const onSubmit: SubmitHandler<AddAdminFormValues> = async (
    userData: AddAdminFormValues
  ) => {
    console.log(userData);

    const response = await fetch(REGISTER_ADMIN_API_ENDPOINT, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: userData.name,
        password: userData.passwd,
      }),
    });

    const apiCode = response.headers.get("api-code");
    console.log(apiCode);

    if (apiCode === "1000" || apiCode === "1001") {
      setError("name", {
        type: "server",
        message: "Niepoprawne dane!",
      });
    } else if (apiCode === "2000") {
      setError("name", {
        type: "server",
        message: "Admin o tej nazwie już istnieje!",
      });
    } else if (apiCode === "0") {
      setMessage("Dodano admina!");
      setTimeout(() => setMessage(""), 3000);
      reset({ name: "", passwd: "" });
    }
  };

  return (
    <AdminLayout adminName={adminName} header={"Dodaj admina"}>
      <StyledH2Message>{message}</StyledH2Message>
      {!message ? (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <FormField
            {...register("name", { required: true })}
            placeholder="Nazwa admina"
            error={errors.name}
            autoComplete={"off"}
          />
          <FormField
            {...register("passwd")}
            placeholder="Hasło"
            type="password"
            error={errors.passwd}
            autoComplete={"off"}
          />
          <YellowButton type="submit">Dodaj</YellowButton>
        </StyledForm>
      ) : null}
    </AdminLayout>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const admin = await getAdminData(ctx);

  if (!admin.isLoggedIn) {
    return {
      redirect: {
        permanent: false,
        destination: "/admin/login",
      },
    };
  }

  return {
    props: {
      adminName: admin.name,
    },
  };
}

export default AddAdmin;
