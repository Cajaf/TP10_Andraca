const Picker = require('@react-native-picker/picker').Picker;
import { StyleSheet, Text, View } from 'react-native';

type TicketType = {
  label: string;
  value: string;
};

type TicketTypeSelectorProps = {
  label: string;
  value: string;
  options: TicketType[];
  onChange: (value: string) => void;
  error?: string;
};

export function TicketTypeSelector({
  label,
  value,
  options,
  onChange,
  error,
}: TicketTypeSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.dropdownContainer, error ? styles.dropdownError : null]}>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue: string | number) => onChange(String(itemValue))}
          style={styles.picker}
          dropdownIconColor="#F4F7FC"
          mode="dropdown"
        >
          <Picker.Item label="Elegí un tipo de entrada" value="" />
          {options.map((option) => (
            <Picker.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Picker>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1c1c1e',
    marginBottom: 8,
    fontFamily: 'System',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#c7c7cc',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  dropdownError: {
    borderColor: '#d93025',
  },
  picker: {
    height: 48,
    color: '#000000',
    fontFamily: 'System',
  },
  errorText: {
    color: '#d93025',
    fontSize: 12,
    marginTop: 6,
    fontWeight: '400',
    fontFamily: 'System',
  },
});
