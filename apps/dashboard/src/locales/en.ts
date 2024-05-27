export default {
  description: 'A decent localization management platform',
  common: {
    error: 'Something went wrong. Please try again.',
    manageAccount: 'Manage account',
    theme: {
      light: 'Light',
      dark: 'Dark',
      system: 'System',
    },
  },
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
    logout: 'Sign out',
  },
  workspace: {
    createNewWorkspace: 'Create new workspace',
    create: {
      title: 'Create a new workspace',
      description:
        'Workspaces are shared environments where teams can collaborate on projects.',
      name: 'Workspace Name',
      slug: 'Workspace URL',
      create: 'Create workspace',
      success: {
        toastTitle: 'Workspace created',
        toastDescription: 'Your workspace has been successfully created.',
      },
    },
  },
  project: {
    listTitle: 'Projects',
    createNewProject: 'Create new project',
    create: {
      title: 'Setup a new project',
      name: 'Project Name',
      sourceLanguage: 'Source Language',
      create: 'Create project',
      success: {
        toastTitle: 'Project created',
        toastDescription: 'Your project has been successfully created.',
      },
    },
  },
} as const
