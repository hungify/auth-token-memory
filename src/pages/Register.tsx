import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Form, FormField, TextInput } from 'grommet';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAuth } from '~/hooks';
import type { RegisterInput } from '~/interfaces/auth';

const registerSchema = yup
  .object({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(30).required(),
  })
  .required();

export default function Register() {
  const { control, handleSubmit } = useForm<RegisterInput>({
    defaultValues: {
      email: 'abc@gmail.com',
      password: '123456',
      fullName: 'abc',
    },
    resolver: yupResolver(registerSchema),
  });
  const { onRegister } = useAuth();
  const onSubmit = (registerInput: RegisterInput) => {
    onRegister(registerInput);
  };

  return (
    <Box fill align='center' justify='center' pad='medium'>
      <Box width='medium'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='fullName'
            control={control}
            render={({ field }) => (
              <FormField label={field.name} name={field.name}>
                <TextInput {...field} placeholder='Enter your username' type='text' />
              </FormField>
            )}
          />
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <FormField label={field.name} name={field.name}>
                <TextInput {...field} placeholder='Enter your email' type='email' />
              </FormField>
            )}
          />
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <FormField label={field.name} name={field.name}>
                <TextInput {...field} placeholder='Enter your password' type='password' />
              </FormField>
            )}
          />

          <Button primary size='medium' label='Register' type='submit' />
        </Form>
      </Box>
    </Box>
  );
}
