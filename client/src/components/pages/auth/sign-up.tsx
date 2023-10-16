import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Navigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import { useAuth } from '@/features/auth';
import { useNavigationHistory, useMount } from '@/hooks';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FormField } from '@/components/ui/form';
import { Loader } from '@/components/ui/loader';

const passwordTemplate = 'Password must contains at least one';

const signInSchema = z
  .object({
    email: z.string().email(),
    confirmPassword: z.string().min(8).max(24),
    password: z
      .string()
      .min(8)
      .max(24)
      .regex(/[0-9]/, `${passwordTemplate} number`)
      .regex(/[A-Z]/, `${passwordTemplate} uppercase letter`)
      .regex(/[a-z]/, `${passwordTemplate} lowercase letter`),
  })
  .refine((form) => form.password === form.confirmPassword, {
    message: 'Passwords are not match',
    path: ['confirmPassword'],
  });

type SignInSchema = z.infer<typeof signInSchema>;

export function SignUpPage() {
  const navigate = useNavigate();
  const { isMounted } = useMount();
  const { error, isUserLoading, register: authSignUp, user } = useAuth();
  const { isPreviousPageExists } = useNavigationHistory();

  const { register, handleSubmit, formState } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = useCallback(
    (form: SignInSchema) => {
      authSignUp(form.email, form.password);
    },
    [authSignUp]
  );

  if (user && !isUserLoading) {
    return <Navigate to='/' />;
  }

  if (!user && isUserLoading && !isMounted) {
    return <Loader />;
  }

  return (
    <Card className='min-w-[400px]' addInnerPadding>
      <h4 className='mb-2 text-xl font-semibold'>Sign up</h4>
      {error && <h3 className='text-red-500'>{error}</h3>}
      {isUserLoading && <h3 className='text-gray-600'>Loading...</h3>}

      <form className='flex flex-col gap-1' onSubmit={handleSubmit(onSubmit)}>
        <FormField
          autoComplete='off'
          error={formState.errors.email?.message}
          label='Email'
          register={register('email')}
        />

        <FormField
          error={formState.errors.password?.message}
          label='Password'
          register={register('password')}
          type='password'
        />

        <FormField
          error={formState.errors.confirmPassword?.message}
          label='Confirm password'
          register={register('confirmPassword')}
          type='password'
        />

        <div className='mt-3 flex gap-2 items-center justify-end'>
          {isPreviousPageExists && (
            <Button
              className='mr-auto'
              onClick={() => navigate(-1)}
              type='button'
              variant='text'
            >
              Cancel
            </Button>
          )}
          <Button
            onClick={() => navigate('/auth/sign-in')}
            type='button'
            variant='contained'
          >
            Sign in
          </Button>
          <Button disabled={isUserLoading} type='submit'>
            Register
          </Button>
        </div>
      </form>
    </Card>
  );
}
