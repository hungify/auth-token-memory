import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Form, FormField, Paragraph, TextInput } from 'grommet';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAuth } from '~/hooks';
import type { LoginInput } from '~/interfaces/auth';

const loginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(30).required(),
  })
  .required();
export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    defaultValues: {
      email: 'abc@gmail.com',
      password: '123456',
    },
    resolver: yupResolver(loginSchema),
  });
  const { onLogin, isAuthenticated } = useAuth();

  const onSubmit = async (loginInput: LoginInput) => {
    onLogin(loginInput);
  };

  return (
    <Box fill align='center' justify='center' pad='medium'>
      {!isAuthenticated ? (
        <Box width='medium'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <FormField label={field.name} name={field.name}>
                  <TextInput {...field} placeholder='Enter your email' />
                  {errors.email && (
                    <Box pad='small'>
                      <Paragraph color='status-error'>{errors.email.message}</Paragraph>
                    </Box>
                  )}
                </FormField>
              )}
            />
            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <FormField label={field.name} name={field.name}>
                  <TextInput {...field} placeholder='Enter your password' />
                  {errors.password && (
                    <Box pad='small'>
                      <Paragraph color='status-error'>{errors.password.message}</Paragraph>
                    </Box>
                  )}
                </FormField>
              )}
            />
            <Button primary size='medium' label='Login' type='submit' />
          </Form>
        </Box>
      ) : (
        <Paragraph size='medium'>You are logged in</Paragraph>
      )}
    </Box>
  );
}
