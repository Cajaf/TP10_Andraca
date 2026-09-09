import { FormInput } from '@/components/FormInput';
import { FestivalFormValues } from '@/components/InscriptionSummary';
import { TicketConfirmation } from '@/components/TicketConfirmacion';
import { TicketTypeSelector } from '@/components/TicketTypeSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
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

  useEffect(() => {
    const loadSavedEmail = async () => {
      const savedEmail = await AsyncStorage.getItem('Email');

      if (savedEmail) {
        setValue('email', savedEmail);
      }
    };

    loadSavedEmail();
  }, [setValue]);

  const saveEmailToLocalStorage = async (email: string) => {
    await AsyncStorage.setItem('Email', email);
  };

  const formValues = watch();

  const emailRegex = /^[^\s@]+@[^\s@]+$/;

  const isFormValid =
    formValues.nombreCompleto.trim().length >= 3 &&
    emailRegex.test(formValues.email) &&
    Number(formValues.edad) >= 12 &&
    Number(formValues.edad) <= 99 &&
    !!formValues.tipoEntrada;

  const onSubmit = async (data: FestivalFormValues) => {
    setIsSubmitting(true);

    await saveEmailToLocalStorage(data.email);

    setTimeout(() => {
      setSubmittedData(data);
      setIsSubmitting(false);
      setModalVisible(true);
    }, 1000);
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
            disabled={!isFormValid || isSubmitting}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Cargando...' : 'Enviar inscripción'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {isSubmitting ? (
        <View style={styles.loadingOverlay} pointerEvents="none">
          <View style={styles.loadingBox}>
            <Text style={styles.loadingText}>Cargando...</Text>
          </View>
        </View>
      ) : null}

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
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingBox: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  loadingText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});

