export default {
  description: 'A decent localization management platform',
  auth: {
    login: {
      title: 'Login to Languist',
      description:
        "Manage your app's localization, collaborate with your team, and automate translation workflows.",
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot your password?',
      login: 'Login',
      continueWith: 'Or continue with',
      github: 'GitHub',
      dontHaveAccount: "Don't have an account?",
      signUp: 'Sign up',
      error: 'Something went wrong. Please try again.',
      success: {
        toastTitle: 'Welcome back!',
        toastDescription: 'You have successfully logged in.',
      },
    },
    signUp: {
      title: 'Create an account',
      description:
        "Manage your app's localization, collaborate with your team, and automate translation workflows.",
      email: 'Email',
      password: 'Password',
      signUp: 'Sign up',
      continueWith: 'Or continue with',
      github: 'GitHub',
      haveAccount: 'Already have an account?',
      signIn: 'Sign in',
      success: {
        title: 'Success!',
        description: 'Check your mailbox to verify your account.',
        toastTitle: 'Welcome to Languist!',
        toastDescription: 'Check your mailbox to verify your account.',
      },
    },
    forgotPassword: {
      title: 'Forgot your password?',
      description:
        'Enter your email address and we will send you a link to reset your password.',
      email: 'Email',
      sendResetLink: 'Send reset link',
      backToLogin: 'Back to login',
      success: {
        title: 'Password reset requested',
        description:
          'Please check your email for instructions to reset your password.',
        toastTitle: 'Password reset requested',
        toastDescription:
          'Please check your email for instructions to reset your password.',
      },
    },
    updatePassword: {
      title: 'Update your password',
      description: 'Enter your new password to update your account.',
      password: 'Password',
      confirmPassword: 'Confirm password',
      updatePassword: 'Update password',
      success: {
        title: 'Password updated',
        description:
          'Your password has been successfully updated. You will be redirected to dashboard soon.',
      },
    },
  },
} as const
