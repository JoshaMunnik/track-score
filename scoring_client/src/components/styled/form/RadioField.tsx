

type RadioFieldProps = Readonly<{
  name: string;
  checked: boolean;
  onChanged: () => void;
}>;

export function RadioField({name, checked, onChanged}: RadioFieldProps) {
  return (
    <input type="radio" name={name} checked={checked} onChange={onChanged}/>
  );
}