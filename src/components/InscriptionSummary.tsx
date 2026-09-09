import { StyleSheet, Text, View } from 'react-native';

export type FestivalFormValues = {
  nombreCompleto: string;
  email: string;
  edad: string;
  tipoEntrada: string;
  telefono: string;
};

type InscriptionSummaryProps = {
  data: FestivalFormValues;
};

export function InscriptionSummary({ data }: InscriptionSummaryProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Resumen de inscripción</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.value}>{data.nombreCompleto}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{data.email}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Edad</Text>
        <Text style={styles.value}>{data.edad} años</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Entrada</Text>
        <Text style={styles.value}>{data.tipoEntrada}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Teléfono</Text>
        <Text style={styles.value}>{data.telefono || 'No especificado'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
    fontFamily: 'System',
  },
  row: {
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5ea',
  },
  label: {
    fontSize: 12,
    color: '#3c3c43',
    marginBottom: 4,
    fontWeight: '400',
    fontFamily: 'System',
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
    fontFamily: 'System',
  },
});
