import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { FestivalFormValues, InscriptionSummary } from './InscriptionSummary';

type TicketConfirmationProps = {
  visible: boolean;
  data: FestivalFormValues | null;
  onClose: () => void;
};

export function TicketConfirmation({ visible, data, onClose }: TicketConfirmationProps) {
  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <Text style={styles.title}>¡Inscripción confirmada!</Text>

          {data ? <InscriptionSummary data={data} /> : null}

          <Pressable onPress={onClose} style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#ffffff',
    padding: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 18,
    textAlign: 'center',
    fontFamily: 'System',
  },
  confirmButton: {
    marginTop: 22,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
  },
});
