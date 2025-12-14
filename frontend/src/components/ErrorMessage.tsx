import { FieldError } from './ui/field';

export function ErrorMessage({ arrayMessages }: { arrayMessages?: string[]  }) {
  if (!arrayMessages ) return null;
  return (
    <FieldError>
      {arrayMessages.map((messsage, i) => (
        <p key={i}>{messsage}</p>
      ))}
    </FieldError>
  );
}
