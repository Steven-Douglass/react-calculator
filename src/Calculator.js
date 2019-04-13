import React, { Component } from 'react';
import './calculate.js';
import './Calculator.css';
import { calculate } from './calculate.js';

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentEntry: '0',
            total: 0,
            currentOperator: ''
        }
    }

    handleClickNum(num) {
        // Handle overflow of too many digits
        if (this.state.currentEntry.length > 17) {
            this.setState({
                currentEntry: 'Overflow!',
                total: 0,
                currentOperator: ''
            })
            return;
        }
        // Restart calculations if a number is pressed with no operator
        if (this.state.currentOperator === '' && this.state.currentEntry === '0') {
            this.setState({
                total: 0
            });
        }
        // Ensure only one decimal can be added to an entry.
        if (num === '.') {
            if (this.state.currentEntry === 'Overflow!') {
                // Do nothing
            } else if (this.state.currentEntry.includes('.')) {
                // Do nothing
            } else {
                this.setState({
                    currentEntry: this.state.currentEntry + num
                })
            }
        // Number presses
        } else if (this.state.currentEntry === '0') {
            // When the current entry is 0, allow it to be changed to 1-9
            if (num !== '0') {
                this.setState({
                    currentEntry: num
                })
            } 
        } else if (this.state.currentEntry === 'Overflow!') {
            // When the current entry is 'Overflow!', change
            // currentEntry to the number that was pressed
            this.setState({
                currentEntry: num
            })
        }
        else if (this.state.currentEntry === '-0') {
            // Concatenate the number press to the current negative sign
            this.setState({
                currentEntry: '-' + num
            })
        } else {
            // Concatenate the number press to the current entry
            this.setState({
                currentEntry: this.state.currentEntry + num
            })
        }
    }

    handleClickOperator(op) {
        if (op === '=') {
            if (this.state.currentOperator === '') {
                // If there is no current operator, return the current entry
                this.setState({
                    total: parseFloat(this.state.currentEntry),
                    currentOperator: '',
                    currentEntry: '0'
                });
            } else {
                // The current operator is one of: + - * /
                if (this.state.currentOperator === '+') {
                    this.setState({
                        total: calculate(this.state.total, this.state.currentEntry, '+'),
                        currentEntry: '0',
                        currentOperator: '',
                    });
                }
                else if (this.state.currentOperator === "-") {
                    this.setState({
                        total: calculate(this.state.total, this.state.currentEntry, '-'),
                        currentEntry: '0',
                        currentOperator: '',
                    });
                } else if (this.state.currentOperator === "*") {
                    this.setState({
                        total: calculate(this.state.total, this.state.currentEntry, '*'),
                        currentEntry: '0',
                        currentOperator: '',
                    });
                } else if (this.state.currentOperator === "/") {
                    // eslint-disable-next-line
                    if (this.state.total == 0 & this.state.currentEntry === '0') {
                        // Do not divide by zero by zero. Do nothing.
                    } else {
                        this.setState({
                            total: calculate(this.state.total, this.state.currentEntry, '/'),
                            currentEntry: '0',
                            currentOperator: '',
                        });
                    }
                    
                }
            }
        } else if (op === '+' || op === '-' || op === '*' || op === '/') {
            // The operator that was clicked is one of: + - * /
            if (op === '+') {
                // Allow for operator change if no numbers have been pressed
                if (this.state.currentOperator !== '' && this.state.currentEntry === '0') {
                    this.setState({
                        currentOperator: '+'
                    });
                } else if (this.state.currentOperator !== '') {
                    // Perform the calculation of the last operator. This allows
                    // operations to be chained together without needing to press
                    // the equals key.
                    this.setState({
                        total: calculate(this.state.total, this.state.currentEntry, this.state.currentOperator),
                        currentEntry: '0',
                        currentOperator: '+',
                    });
                } else if (this.state.total !== 0) {
                    // There is a total value with no current operator. This
                    // occurs after the equal button is pressed. Set currentOperator
                    // to the operator that was pressed.
                    this.setState({
                        currentOperator: '+',
                    });
                } else {
                    // Total === 0. Set the total to currentEntry.
                    this.setState({
                        total: parseFloat(this.state.currentEntry).toString(),
                        currentEntry: '0',
                        currentOperator: '+',
                    });
                }
            } else if (op === '-') {
                // Allow for operator change if no numbers have been pressed
                if (this.state.currentOperator !== '' && this.state.currentEntry === '0') {
                    this.setState({
                        currentOperator: '-'
                    })
                } else if (this.state.currentOperator !== '') {
                    // Perform the calculation of the last operator. This allows
                    // operations to be chained together without needing to press
                    // the equals key.
                    this.setState({
                        total: calculate(this.state.total, this.state.currentEntry, this.state.currentOperator),
                        currentEntry: '0',
                        currentOperator: '-',
                    })
                } else if (this.state.total !== 0) {
                    // There is a total value with no current operator. This
                    // occurs after the equal button is pressed. Set currentOperator
                    // to the operator that was pressed.
                    this.setState({
                        currentOperator: '-',
                    })
                } else {
                    // Total === 0. Set the total to currentEntry.
                    this.setState({
                        total: parseFloat(this.state.currentEntry).toString(),
                        currentEntry: '0',
                        currentOperator: '-',
                    })
                }
            } else if (op === '*') {
                // Allow for operator change if no numbers have been pressed
                if (this.state.currentOperator !== '' && this.state.currentEntry === '0') {
                    this.setState({
                        currentOperator: '*'
                    })
                } else if (this.state.currentOperator !== '') {
                    // Perform the calculation of the last operator. This allows
                    // operations to be chained together without needing to press
                    // the equals key.
                    this.setState({
                        total: calculate(this.state.total, this.state.currentEntry, this.state.currentOperator),
                        currentEntry: '0',
                        currentOperator: '*',
                    })
                } else if (this.state.total !== 0) {
                    // There is a total value with no current operator. This
                    // occurs after the equal button is pressed. Set currentOperator
                    // to the operator that was pressed.
                    this.setState({
                        currentOperator: '*',
                    })
                } else {
                    // Total === 0. Set the total to currentEntry.
                    this.setState({
                        total: parseFloat(this.state.currentEntry).toString(),
                        currentEntry: '0',
                        currentOperator: '*',
                    })
                }
            } else if (op === '/') {
                // Allow for operator change if no numbers have been pressed
                if (this.state.currentOperator !== '' && this.state.currentEntry === '0') {
                    this.setState({
                        currentOperator: '/'
                    })
                } else if (this.state.currentOperator !== '') {
                    // Perform the calculation of the last operator. This allows
                    // operations to be chained together without needing to press
                    // the equals key.
                    this.setState({
                        total: calculate(this.state.total, this.state.currentEntry, this.state.currentOperator),
                        currentEntry: '0',
                        currentOperator: '/',
                    })
                } else if (this.state.total !== 0) {
                    // There is a total value with no current operator. This
                    // occurs after the equal button is pressed. Set currentOperator
                    // to the operator that was pressed.
                    this.setState({
                        currentOperator: '/',
                    })
                } else {
                    // Total === 0. Set the total to currentEntry.
                    this.setState({
                        total: parseFloat(this.state.currentEntry).toString(),
                        currentEntry: '0',
                        currentOperator: '/',
                    })
                }
            }
        } else if (op === 'AC') {
            this.setState({
                currentEntry: '0',
                total: 0,
                currentOperator: ''
            })
        } else if (op === 'CE') {
            this.setState({
                currentEntry: '0'
            })
        } else if (op === "+-") {
            if (this.state.currentEntry === '0') {
                this.setState({
                    currentEntry: '-0'
                })
            } else if (this.state.currentEntry === '-0') {
                this.setState({
                    currentEntry: '0'
                })
            } else if (this.state.currentEntry !== 'Overflow!') {
                this.setState({
                    currentEntry: -parseFloat(this.state.currentEntry).toString()
                })
            }
        }
    }

    render() {
        return (
            <div id='calculator'>
                <div id="display">
                    <p id="text">{this.state.currentEntry}</p>
                    <p id="displayText">{this.state.total}</p>
                </div>
                <div id='buttons'>
                    <button onClick={() => this.handleClickNum("7")} id="7">7</button>
                    <button onClick={() => this.handleClickNum("8")} id="8">8</button>
                    <button onClick={() => this.handleClickNum("9")} id="9">9</button>
                    <button onClick={() => this.handleClickOperator("+")} id="add"
                        className={this.state.currentOperator === "+" ? 'bigText buttonPressed' : 'bigText' }>+</button>
                    <button onClick={() => this.handleClickNum("4")} id="4">4</button>
                    <button onClick={() => this.handleClickNum("5")} id="5">5</button>
                    <button onClick={() => this.handleClickNum("6")} id="6">6</button>
                    <button onClick={() => this.handleClickOperator("-")} id="subtract"
                        className={this.state.currentOperator === "-" ? 'bigText buttonPressed' : 'bigText' }>&minus;</button>
                    <button onClick={() => this.handleClickNum("1")} id="1">1</button>
                    <button onClick={() => this.handleClickNum("2")} id="2">2</button>
                    <button onClick={() => this.handleClickNum("3")} id="3">3</button>
                    <button onClick={() => this.handleClickOperator("*")} id="multiply"
                        className={this.state.currentOperator === "*" ? 'bigText buttonPressed' : 'bigText' }>&times;</button>
                    <button onClick={() => this.handleClickNum("0")} id="btn0">0</button>
                    <button onClick={() => this.handleClickNum(".")} id="decimal">.</button>
                    <button onClick={() => this.handleClickOperator("/")} id="divide"
                        className={this.state.currentOperator === "/" ? 'bigText buttonPressed' : 'bigText' }>&divide;</button>
                    <button onClick={() => this.handleClickOperator("AC")} id="AC">AC</button>
                    <button onClick={() => this.handleClickOperator("CE")} id="CE">CE</button>
                    <button onClick={() => this.handleClickOperator("+-")} id="invertSign"
                        className='bigText'>&plusmn;</button>
                    <button onClick={() => this.handleClickOperator("=")} id="equals" className='bigText'>=</button> 
                </div>
            </div>
        )
    }
}

export default Calculator;