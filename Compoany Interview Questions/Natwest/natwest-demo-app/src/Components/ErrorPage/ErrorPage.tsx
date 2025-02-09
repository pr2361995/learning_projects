import classes from './ErrorPage.module.css'

interface ErrorPageProps {
  message: string;
  onRetry?: () => void;  // Optional retry function in case the user wants to try again
}

const ErrorPage = ({ message, onRetry }: ErrorPageProps) => {
  return (
    <div className={classes.errorContainer}>
      <h2 className={classes.errorMessage}>Oops! Something went wrong.</h2>
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className={classes.retryButton}>
          Retry
        </button>
      )}
    </div>
  )
}

export default ErrorPage
