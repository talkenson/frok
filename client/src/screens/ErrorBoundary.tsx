import { FC, PropsWithChildren } from 'react'
import { ErrorBoundary as Boundary, FallbackProps } from 'react-error-boundary'
import { Button } from '@/ui/Button'

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div role='alert' className='flex flex-col space-y-4 p-4'>
      <p className='w-full text-center text-lg font-semibold text-main-text'>
        Что-то пошло не так...
      </p>
      <Button
        onClick={() => {
          window.location.reload()
        }}
      >
        Обновить страницу
      </Button>
      <p className='w-full text-center text-main-text'>
        Возможно, это связано с обновлением приложения, вы можете просто нажать
        на кнопку.
      </p>
      <p className='w-full text-center text-secondary-text'>
        Если это не поможет, ниже находится информация об ошибке, которую можно
        отправить в поддержку.
      </p>
      <pre className='text-secondary-text'>{error.message}</pre>
    </div>
  )
}

export const ErrorBoundary: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Boundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      {children}
    </Boundary>
  )
}
