import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertDestructive() {
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Passwords don't match</AlertTitle>
      <AlertDescription>
        Please confirm your password again.
      </AlertDescription>
    </Alert>
  )
}
