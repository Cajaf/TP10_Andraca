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
    formState: { errors },
  } = useForm<FestivalFormValues>({
    defaultValues: {
      nombreCompleto: '',
      email: '',
      edad: '',
      tipoEntrada: '',
      telefono: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: FestivalFormValues) => {
    setSubmittedData(data);
    setModalVisible(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screen}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.title}>Sonido Sur</Text>
          <Text style={styles.subtitle}>Inscripción al festival</Text>

          <Controller
            control={control}
            name="nombreCompleto"
            rules={{
              required: 'Ingresá tu nombre completo',
              validate: (value) => value.trim().length >= 3 || 'Ingresá tu nombre completo',
            }}
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="Nombre completo"
                value={value}
                placeholder="Ingresá tu nombre completo"
                onChangeText={onChange}
                error={errors.nombreCompleto?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Ingresá un email válido',
              validate: (value) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Ingresá un email válido',
            }}
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="Email"
                value={value}
                placeholder="ejemplo@correo.com"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="edad"
            rules={{
              required: 'La edad tiene que ser mayor a 12',
              validate: (value) => {
                const numericValue = Number(value);
                return (
                  (!Number.isNaN(numericValue) && numericValue >= 12 && numericValue <= 99) ||
                  'La edad tiene que ser mayor a 12'
                );
              },
            }}
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="Edad"
                value={value}
                placeholder="Ej: 22"
                keyboardType="numeric"
                onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ''))}
                error={errors.edad?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="tipoEntrada"
            rules={{
              required: 'Elegí un tipo de entrada',
            }}
            render={({ field: { onChange, value } }) => (
              <TicketTypeSelector
                label="Tipo de entrada"
                value={value}
                options={ticketOptions}
                onChange={onChange}
                error={errors.tipoEntrada?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="telefono"
            rules={{
              validate: (value) =>
                value === '' || /^\d+$/.test(value) || 'Solo se permiten números',
            }}
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="Teléfono (opcional)"
                value={value}
                placeholder="Solo números"
                keyboardType="numeric"
                onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ''))}
                error={errors.telefono?.message}
              />
            )}
          />

          <Pressable style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
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
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 16,
    color: '#3c3c43',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'System',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
    borderRadius: 8,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
  },
});

