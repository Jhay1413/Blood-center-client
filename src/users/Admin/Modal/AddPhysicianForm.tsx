
import { useMutation } from "@tanstack/react-query"
import { useForm, Resolver } from "react-hook-form"
import { addPhysicanAccount } from "../../../api/AdminAPI/Accounts"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Modal } from "antd"



type props = {
  isDocModalOpen: boolean
  cancelDocModal: () => void
}

type FormValues = {
  email: string
  password: string
  userRoles: string
  userId: string

}

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.email ? values : {},
    errors: !values.email ?
      {
        email: {
          type: "required",
          message: "  Email is required",
        },
      }
      : {},
  }
}
const AddPhysicianForm = () => {

  const form = useForm<FormValues>({ resolver })


  const mutation = useMutation({
    mutationFn: addPhysicanAccount,
    onSuccess: () => {
      console.log("submitted")
    },
  })

  const onSubmit = (data: FormValues) => {

  }

  return (
  
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (  
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="email" />
                </FormControl>
                <FormDescription>Enter an email here</FormDescription>
                <FormMessage />
              </FormItem>

            )} />
          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} placeholder="password" />
              </FormControl>
              <FormDescription>Enter a password here</FormDescription>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="userRoles" render={({ field }) => (
            <FormItem>
              <FormLabel>User Roles</FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Doctor">Light</SelectItem>
                    <SelectItem value="Doctor">Light</SelectItem>
                    <SelectItem value="Doctor">Light</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Enter user roles here</FormDescription>
              <FormMessage />
            </FormItem>
          )} />
        </form>

      </Form>
  );


}
export default AddPhysicianForm;