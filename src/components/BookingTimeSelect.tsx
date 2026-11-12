interface Props {
  label: string;
  value: string;
  lastHour: number;
  onChange: (value: string) => void;
  isDisabled?: (value: string) => boolean;
}

export function BookingTimeSelect({ label, value, lastHour, onChange, isDisabled }: Props) {
  const options = Array.from({ length: lastHour - 8 + 1 }, (_, index) => `${String(8 + index).padStart(2, '0')}:00`);
  return <label>{label}<select required aria-label={label} value={value} onChange={event => onChange(event.target.value)}>
    {options.map(time => <option key={time} value={time} disabled={isDisabled?.(time)}>{time}</option>)}
  </select></label>;
}
