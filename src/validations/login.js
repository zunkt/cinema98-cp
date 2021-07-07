import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

export default function validateFormLogin(formInitialValues) {
  const schema = yup.object({
    email: yup
      .string()
      .required()
      .email()
  })

  const { handleSubmit, errors } = useForm({
    validationSchema: schema,
    initialValues: formInitialValues
  })

  const { value: email } = useField('email')
  const { value: password } = useField('password')

  return {
    email,
    password,
    errors,
    handleSubmit
  }
}
