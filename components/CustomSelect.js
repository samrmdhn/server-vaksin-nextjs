import Select from "react-select";
export default function CustomSelect({
  onChange,
  options,
  value,
  name,
  style,
}) {
  const defaultValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : "";
  };

  return (
    <div>
      <Select
        name={name}
        value={defaultValue(options, value)}
        onChange={(value) => {
          onChange(value);
        }}
        options={options}
        styles={style}
      />
    </div>
  );
}
