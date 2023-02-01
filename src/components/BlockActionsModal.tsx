import {
  Modal,
  Dimensions,
  Text,
  
  TouchableOpacity,
  
} from 'react-native';
import { StyleSheet, View } from 'react-native';
import React from 'react';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
interface BlockActionsModalProps {
  deleteWorkout: () => void;
}
const BlockActionsModal: React.FC<BlockActionsModalProps> = ({ deleteWorkout }) => {
  return (
    <Modal animationType="slide" transparent={true}>
      <View>
        <View style={styles.bottomSheetContainer}>
          <View style={styles.line}></View>

          <TouchableOpacity accessibilityRole="button" onPress={deleteWorkout}>
            <Text style={styles.delete}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT / 1.5,
    borderWidth: 1,
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
  delete: {
    fontSize: '18%',
    left: '43%',
  },
});
export default BlockActionsModal;
