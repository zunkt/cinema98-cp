import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'

export default function validateFormForgot() {
  const i18n = useI18n()
  const schema = yup.object({
    email: yup.string().label(i18n.t('email')).required().email(),
    name: yup.string().label(i18n.t('name')).required()
  })

  const { handleSubmit, errors } = useForm({
    validationSchema: schema
  })

  const { value: email } = useField('email')
  const { value: name } = useField('name')

  return {
    email,
    name,
    errors,
    handleSubmit
  }
}
