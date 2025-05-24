import { TextInput, PasswordInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAuthStore } from "../../core/Auth/application/auth.stores";
import { useLocation } from "wouter";

const SignupForm = () => {
  const { signup } = useAuthStore();
  const [, navigation] = useLocation();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validate: {
      name: (value: string) => (value.length >= 3 ? null : "Nombre inválido"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido"),
      password: (value) =>
        value.length >= 6
          ? null
          : "La contraseña debe tener al menos 6 caracteres",
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log("Login values:", values);
    signup(values.password, values.email, values.name).then(() => {
      navigation("/");
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        mb={15}
        label="Name"
        placeholder="ej. Luis Perez"
        {...form.getInputProps("name")}
        required
      />
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
        Sign up
      </Button>
    </form>
  );
};

export default SignupForm;
