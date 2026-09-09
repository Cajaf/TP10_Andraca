import { FormInput } from '@/components/FormInput';
import { FestivalFormValues } from '@/components/InscriptionSummary';
import { TicketConfirmation } from '@/components/TicketConfirmacion';
import { TicketTypeSelector } from '@/components/TicketTypeSelector';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const ticketOptions = [
  { label: 'General', value: 'General' },
  { label: 'VIP', value: 'VIP' },
  { label: 'Backstage', value: 'Backstage' },
];

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [submittedData, setSubmittedData] = useState<FestivalFormValues | null>(null);

  const {
    control,
    handleSubmit,
    watch,
  } = useForm<FestivalFormValues>({
    defaultValues: {
      nombreCompleto: '',
      email: '',
      edad: '',
      tipoEntrada: '',
      telefono: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const formValues = watch();

  const isFormValid =
    formValues.nombreCompleto?.trim().length >= 3 &&
    formValues.email.includes('@') &&
    Number(formValues.edad) >= 12 &&
    Number(formValues.edad) <= 99 &&
    !!formValues.tipoEntrada;

  const onSubmit = (data: FestivalFormValues) => {
    setSubmittedData(data);
    setModalVisible(true);
  };

  let keyboardBehavior: 'padding' | undefined;

  if (Platform.OS === 'ios') {
    keyboardBehavior = 'padding';
  } else {
    keyboardBehavior = undefined;
  }

  let buttonStyle: typeof styles.submitButton;

  if (isFormValid) {
    buttonStyle = styles.submitButton;
  } else {
    buttonStyle = { ...styles.submitButton, ...styles.submitButtonDisabled };
  }

  return (
    <KeyboardAvoidingView
      behavior={keyboardBehavior}
      style={styles.screen}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.title}>Sonido Sur</Text>
          <Text style={styles.subtitle}>Inscripción al festival</Text>

          <Controller
            control={control}
            name="nombreCompleto"
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="Nombre completo"
                value={value}
                placeholder="Ingresá tu nombre completo"
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="Email"
                value={value}
                placeholder="ejemplo@correo.com"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="edad"
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="Edad"
                value={value}
                placeholder="Ej: 22"
                keyboardType="numeric"
                onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ''))}
              />
            )}
          />

          <Controller
            control={control}
            name="tipoEntrada"
            render={({ field: { onChange, value } }) => (
              <TicketTypeSelector
                label="Tipo de entrada"
                value={value}
                options={ticketOptions}
                onChange={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="telefono"
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="Teléfono (opcional)"
                value={value}
                placeholder="Solo números"
                keyboardType="numeric"
                onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ''))}
              />
            )}
          />

          <Pressable
            style={buttonStyle}
            disabled={!isFormValid}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.submitButtonText}>Enviar inscripción</Text>
          </Pressable>
        </View>
      </ScrollView>

      <TicketConfirmation visible={modalVisible} data={submittedData} onClose={() => setModalVisible(false)} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#3c3c43',
    textAlign: 'center',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
    borderRadius: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

