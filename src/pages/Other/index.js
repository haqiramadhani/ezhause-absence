import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Colors} from '../../utils';
import {Icon} from 'react-native-elements';

const Other = () => {
  return (
    <View style={styles.page}>
      <TouchableOpacity style={styles.button}>
        <Icon
          name="info-circle"
          type="font-awesome-5"
          size={40}
          color={Colors.textLight}
        />
        <View style={styles.text}>
          <Text style={styles.title}>Absensi Karyawan</Text>
          <Text style={styles.subtitle}>1.0</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Icon
          name="file-upload"
          type="font-awesome-5"
          size={40}
          color={Colors.textLight}
        />
        <View style={styles.text}>
          <Text style={styles.title}>Export & Import Excel</Text>
          <Text style={styles.subtitle}>
            Export atau import file excel. File yang didukung hanya file yang
            berektensi xls, xlsx dan csv.
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Icon
          name="share-alt-square"
          type="font-awesome-5"
          size={40}
          color={Colors.textLight}
        />
        <View style={styles.text}>
          <Text style={styles.title}>Bagikan</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Icon
          name="comment-dots"
          solid
          type="font-awesome-5"
          size={40}
          color={Colors.textLight}
        />
        <View style={styles.text}>
          <Text style={styles.title}>Berikan Masukan</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: Colors.backgroundDefault,
    flex: 1,
  },
  text: {
    marginLeft: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textLight,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textLight,
    maxWidth: 250,
  },
  button: {
    backgroundColor: Colors.backgroundCard,
    width: '90%',
    flexDirection: 'row',
    padding: 20,
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
});

export default Other;
