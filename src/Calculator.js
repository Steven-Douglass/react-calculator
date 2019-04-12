import React, { Component } from 'react';
import './calculate.js';
import './Calculator.css';
import { calculate } from './calculate.js';

// TODO
// Negative press followed by number should produce negative number
// Keep track of steps taken, i.e. 5+6+7+8 should be on display
// format output of total to include commas i.e. 1,000,000
// Make output text bigger / thicker

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentEntry: '0',
            lastEntry: '0',
            total: 0,
            currentOperator: ''
        }
    }

    handleClickNum(num) {
        // Handle overflow of too many digits
        if (this.state.currentEntry.length > 17) {
            this.setState({
                currentEntry: 'Overflow!',
                lastEntry: '0',
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
        // Numbers
        } else if (this.state.currentEntry === '0' || this.state.currentEntry === 'Overflow!') {
            // When the current entry is 0 or 'Overflow', allow it to be changed to 1-9
            if (num !== '0') {
                this.setState({
                    currentEntry: num
                })
            } 
        } else if (this.state.currentEntry === '-0') {
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
                // There is no current operator, so return the current entry
                if (this.state.currentEntry !== '-') {
                    this.setState({
                        lastEntry: this.state.currentEntry,
                        total: parseFloat(this.state.currentEntry),
                        currentOperator: '',
                        currentEntry: '0'
                    });
                } else {
                    // Do not perform calculations with the negative 
                    // symbol '-' as the current entry. Do nothing.
                }
            } else {
                // The current operator is one of: + - * /
                if (this.state.currentOperator === '+') {
                    this.setState({
                        total: calculate(this.state.total, this.state.currentEntry, '+'),
                        currentEntry: '0',
                        currentOperator: '',
                        lastEntry: this.state.currentEntry
                    });
                }
                else if (this.state.currentOperator === "-") {
                    this.setState({
                        total: calculate(this.state.total, this.state.currentEntry, '-'),
                        currentEntry: '0',
                        currentOperator: '',
                        lastEntry: this.state.currentEntry
                    });
                } else if (this.state.currentOperator === "*") {
                    this.setState({
                        total: calculate(this.state.total, this.state.currentEntry, '*'),
                        currentEntry: '0',
                        currentOperator: '',
                        lastEntry: this.state.currentEntry
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
                            lastEntry: this.state.currentEntry
                        });
                    }
                    
                }
            }
        } else if (op === '+' || op === '-' || op === '*' || op === '/') {
            // The operator that was clicked is one of: + - * /
            if (op === '+') {
                if (this.state.currentOperator !== '' && this.state.currentEntry === '0') {
                    this.setState({
                        currentOperator: '+'
                    });
                } else if (this.state.currentOperator !== '') {
                    this.setState({
                        total: calculate(this.state.total, this.state.currentEntry, this.state.currentOperator),
                        currentEntry: '0',
                        currentOperator: '+',
                        lastEntry: this.state.total
                    });
                } else if (this.state.total !== 0) {
                    this.setState({
                        //total: calculate(this.state.currentEntry, this.state.total, "+"),
                        currentEntry: '0',
                        currentOperator: '+',
                        lastEntry: this.state.currentEntry
                    });
                } else {
                    this.setState({
                        total: this.state.currentEntry,
                        currentEntry: '0',
                        currentOperator: '+',
                        lastEntry: this.state.total
                    });
                }
            } else if (op === '-') {
                if (this.state.currentOperator !== '' && this.state.currentEntry === '0') {
                    this.setState({
                        currentOperator: '-'
                    })
                } else if (this.state.currentOperator !== '') {
                    this.setState({
                        total: calculate(this.state.total, this.state.currentEntry, this.state.currentOperator),
                        currentEntry: '0',
                        currentOperator: '-',
                        lastEntry: this.state.total
                    })
                } else if (this.state.total !== 0) {
                    this.setState({
                        //total: calculate(this.state.currentEntry, this.state.total, "-"),
                        currentEntry: '0',
                        currentOperator: '-',
                        lastEntry: this.state.currentEntry
                    })
                } else {
                    // total === 0 and currentOperator === ''
                    this.setState({
                        total: this.state.currentEntry,
                        currentEntry: '0',
                        currentOperator: '-',
                        lastEntry: this.state.total
                    })
                }
            } else if (op === '*') {
                if (this.state.currentOperator !== '' && this.state.currentEntry === '0') {
                    this.setState({
                        currentOperator: '*'
                    })
                } else if (this.state.currentOperator !== '') {
                    this.setState({
                        total: calculate(this.state.total, this.state.currentEntry, this.state.currentOperator),
                        currentEntry: '0',
                        currentOperator: '*',
                        lastEntry: this.state.total
                    })
                } else if (this.state.total !== 0) {
                    this.setState({
                        //total: calculate(this.state.currentEntry, this.state.total, "*"),
                        currentEntry: '0',
                        currentOperator: '*',
                        lastEntry: this.state.currentEntry
                    })
                } else {
                    this.setState({
                        total: this.state.currentEntry,
                        currentEntry: '0',
                        currentOperator: '*',
                        lastEntry: this.state.total
                    })
                }
            } else if (op === '/') {
                if (this.state.currentOperator !== '' && this.state.currentEntry === '0') {
                    this.setState({
                        currentOperator: '/'
                    })
                } else if (this.state.currentOperator !== '') {
                    this.setState({
                        total: calculate(this.state.total, this.state.currentEntry, this.state.currentOperator),
                        currentEntry: '0',
                        currentOperator: '/',
                        lastEntry: this.state.total
                    })
                } else if (this.state.total !== 0) {
                    this.setState({
                        //total: calculate(this.state.currentEntry, this.state.total, "/"),
                        currentEntry: '0',
                        currentOperator: '/',
                        lastEntry: this.state.currentEntry
                    })
                } else {
                    this.setState({
                        total: this.state.currentEntry,
                        currentEntry: '0',
                        currentOperator: '/',
                        lastEntry: this.state.total
                    })
                }
            }

        } else if (op === 'AC') {
            this.setState({
                currentEntry: '0',
                lastEntry: '0',
                total: 0,
                currentOperator: ''
            })
        } else if (op === 'CE') {
            this.setState({
                currentEntry: '0'
            })
        } else if (op === "+-") {
            if (this.state.currentEntry == '0') {
                console.log("TRIG");
                this.setState({
                    currentEntry: '-0'
                })
            } else if (this.state.currentEntry !== 'Overflow!') {
                this.setState({
                    currentEntry: -parseFloat(this.state.currentEntry).toString()
                })
            } else {
                this.setState({
                    currentEntry: '-0'
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