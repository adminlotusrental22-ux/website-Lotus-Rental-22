interface Props {
  label: string;
  value: string;
  lastHour: number;
  onChange: (value: string) => void;
  isDisabled?: (value: string) => boolean;
}

export function BookingTimeSelect({ label, value, lastHour, onChange, isDisabled }: Props) {
  const options = Array.from({ length: (lastHour - 8) * 4 + 1 }, (_, index) => {
    const minutes = 8 * 60 + index * 15;
    return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
  });
  return <label>{label}<select required aria-label={label} value={value} onChange={event => onChange(event.target.value)}>
    {options.map(time => <option key={time} value={time} disabled={isDisabled?.(time)}>{time}</option>)}
  </select></label>;
}
