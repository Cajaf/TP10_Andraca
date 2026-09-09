import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from 'react-native';

type FormInputProps = {
  label: string;
  value: string;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
};

export function FormInput({
  label,
  value,
  placeholder,
  keyboardType,
  autoCapitalize = 'sentences',
  onChangeText,
  error,
  secureTextEntry = false,
}: FormInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        placeholderTextColor="#7d7f88"
        style={[styles.input, error ? styles.inputError : null]}
      />
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
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#c7c7cc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#000000',
    fontSize: 16,
    fontFamily: 'System',
  },
  inputError: {
    borderColor: '#d93025',
    backgroundColor: '#ffffff',
  },
  errorText: {
    color: '#d93025',
    fontSize: 12,
    marginTop: 6,
    fontWeight: '400',
    fontFamily: 'System',
  },
});
