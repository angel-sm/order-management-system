import { TextInput, PasswordInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAuthStore } from "../../core/Auth/application/auth.stores";
import { useLocation } from "wouter";

const SigninForm = () => {
  const { signin } = useAuthStore();
  const [, navigation] = useLocation();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido"),
      password: (value) =>
        value.length >= 2
          ? null
          : "La contraseña debe tener al menos 6 caracteres",
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log("Login values:", values);
    signin(values.password, values.email).then(() => {
      navigation("/");
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label="Email"
        placeholder="tucorreo@ejemplo.com"
        {...form.getInputProps("email")}
        required
      />
      <PasswordInput
        label="Contraseña"
        placeholder="Tu contraseña"
        mt="md"
        {...form.getInputProps("password")}
        required
      />
      <Button fullWidth mt="xl" type="submit">
        Sign in
      </Button>
    </form>
  );
};

export default SigninForm;
