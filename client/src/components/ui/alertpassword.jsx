import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertPassword() {
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Wrong Emaol Or Password!</AlertTitle>
      <AlertDescription>
        Please rewrite your password and email.
      </AlertDescription>
    </Alert>
  )
}
