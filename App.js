
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, } from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  value: [0, 0],
  current: 0,
}

export default class App extends Component {
  state = { ...initialState }

  addDigito = n => {

    const clearDisplay = this.state.displayValue === '0'
      || this.state.clearDisplay

    if (n === '.' && !clearDisplay &&this.state.displayValue.includes('.')) {
      return
    }

    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n
    this.setState({ displayValue, clearDisplay: false })

    if (n !== '.') {
      const newValue = parseFloat(displayValue)
      const value = [...this.state.value]
      value[this.state.current] = newValue
      this.setState({ value })
    }
  }

  clearMemory = () => {
    this.setState({ ...initialState })
  }

  setOperation = operation => {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true })
    } else {
      const equals = operation === '='
      const value = [...this.state.value]
      try {
        value[0] = eval(`${value[0]} ${this.state.operation} ${value[1]}`)
      } catch {
        value[0] = this.state.value[0]
      }


      value[1] = 0
      this.setState({
        displayValue: `${value[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        value,
      })
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>
          <Button label='AC' triple onClick={this.clearMemory} />
          <Button label='/' operation onClick={() => this.setOperation} />
          <Button label='7' onClick={this.addDigito} />
          <Button label='8' onClick={this.addDigito} />
          <Button label='9' onClick={this.addDigito} />
          <Button label='*' operation onClick={this.setOperation} />
          <Button label='4' onClick={this.addDigito} />
          <Button label='5' onClick={this.addDigito} />
          <Button label='6' onClick={this.addDigito} />
          <Button label='-' operation onClick={this.setOperation} />
          <Button label='1' onClick={this.addDigito} />
          <Button label='2' onClick={this.addDigito} />
          <Button label='3' onClick={this.addDigito} />
          <Button label='+' operation onClick={this.setOperation} />
          <Button label='0' double onClick={this.addDigito} />
          <Button label='.' onClick={this.addDigito} />
          <Button label='=' operation onClick={this.setOperation} />
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});

