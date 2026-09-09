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
};

export function TicketTypeSelector({
  label,
  value,
  options,
  onChange,
}: TicketTypeSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.dropdownContainer}>
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
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#c7c7cc',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  picker: {
    height: 48,
    color: '#000000',
  },
});
