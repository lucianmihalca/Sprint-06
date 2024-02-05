import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { playerService } from "../services/players.services";

const loginSchema = z
  .object({
    name: z
      .string()
      .regex(/^[a-zA-Z\s]*$/, { message: "Name must contain only letters" })
      .optional(),

    accountType: z.enum(["personal", "anonym"]),
    anonymType: z.string().optional()
  })

  .refine(
    data => {
      if (data.accountType === "personal") {
        // Verificar que el nombre no esté vacío para cuentas personales
        return data.name && data.name.length >= 1;
      }
      return true;
    },
    {
      message: "Name is required for personal accounts",
      path: ["name"]
    }
  );

function Login() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: ""
    }
  });
  const accountType = form.watch("accountType");

  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      console.log(values);
      // Determina si se debe enviar el nombre basado en el tipo de cuenta
      const playerName = values.accountType === "personal" && values.name ? values.name.trim() : undefined;
      // Llama al servicio para crear el jugador
      const player = await playerService.createPlayer(playerName);
      console.log("Jugador creado:", player);
      localStorage.setItem("playerId", player.playerId);
      // Navega al dashboard tras el éxito
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al crear el jugador:", error);
      console.log(`El nombre ${values.name} ya esta en uso`);
      // Aquí podrías manejar errores, por ejemplo, mostrar un mensaje al usuario
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-24">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-md w-full flex flex-col space-y-4">
          <FormField
            control={form.control}
            name="accountType"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Account type</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder=" Select account" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="anonym">Anonym</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {accountType === "personal" && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>👤 Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          )}

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </main>
  );
}

export default Login;
