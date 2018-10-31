import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      solution: ""
    }
  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="customizations-container"></div>
          <div className="calc-container">
            <div className="calc-name">SuperCalc</div>
            <div className="solutions">
              <div className="center-text" placeholder=".0">{this.state.solution}</div>
            </div>
            <div className="calc-functions-container">
              <div className="calc-row-one">
                <div onClick={() => this.setState({solution: (this.state.solution + "(")})}>(</div>
                <div onClick={() => this.setState({solution: (this.state.solution + ")")})}>)</div>
                <div onClick={() => this.setState({solution: (this.state.solution + "-")})}>+/-</div>
                <div>AC</div>
              </div>
              <div className="calc-row-two">
                <div onClick={() => this.setState({solution: (this.state.solution + "7")})}>7</div>
                <div onClick={() => this.setState({solution: (this.state.solution + "8")})}>8</div>
                <div onClick={() => this.setState({solution: (this.state.solution + "9")})}>9</div>
                <div onClick={() => this.setState({solution: (this.state.solution + "/")})}>/</div>
              </div>
              <div className="calc-row-three">
                <div onClick={() => this.setState({solution: (this.state.solution + "4")})}>4</div>
                <div onClick={() => this.setState({solution: (this.state.solution + "5")})}>5</div>
                <div onClick={() => this.setState({solution: (this.state.solution + "6")})}>6</div>
                <div onClick={() => this.setState({solution: (this.state.solution + "X")})}>X</div>
              </div>
              <div className="calc-row-four">
                <div onClick={() => this.setState({solution: (this.state.solution + "1")})}>1</div>
                <div onClick={() => this.setState({solution: (this.state.solution + "2")})}>2</div>
                <div onClick={() => this.setState({solution: (this.state.solution + "3")})}>3</div>
                <div onClick={() => this.setState({solution: (this.state.solution + "-")})}>-</div>
              </div>
              <div className="calc-row-five">
                <div onClick={() => this.setState({solution: (this.state.solution + "0")})}>0</div>
                <div onClick={() => this.setState({solution: (this.state.solution + ".")})}>.</div>
                <div>=</div>
                <div onClick={() => this.setState({solution: (this.state.solution + "+")})}>+</div>
              </div>
              <div className="calc-row-six">
                <div>sin</div>
                <div>cos</div>
                <div>tan</div>
                <div onClick={() => this.setState({solution: (this.state.solution.substr(0, this.state.solution.length-1))})}>del</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
