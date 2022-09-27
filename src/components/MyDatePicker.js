import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
const MyDatePicker = (props) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      setShow(true);
    }
  }, [])


  function toJSONLocal(date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  }

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(true);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const dateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    if (Platform.OS === 'android') {
      setShow(false);
    }
    props.onChange(currentDate);
  };

  return (
    <View>
      <View style={{ marginHorizontal: 16, marginTop: 8, justifyContent: 'center', flexDirection: 'row' }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          {
            Platform.OS === 'android' ?
              <TouchableOpacity
                onPress={showDatepicker}
                style={{ backgroundColor: "#D8D8D8", alignItems: 'center', padding: 5, borderRadius: 5 }}>
                <Text>Өдрөө сонгоно уу</Text>
              </TouchableOpacity>
              : <Text style={{ fontWeight: 'bold' }}>Өдрөө сонгоно уу</Text>
          }
        </View>
        <View style={{ flex: 1 }}>
          {
            Platform.OS === 'android' ?
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{toJSONLocal(props.value)}</Text>
              </View>
              : null
          }
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={props.value}
              mode={mode}
              onChange={dateChange}
            />
          )}
        </View>
      </View>
    </View>
  );
}

export default MyDatePicker

const styles = StyleSheet.create({})