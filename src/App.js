import React, { Component } from 'react';
import safeEval from 'safe-eval'
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      solution: "",
      name: "SuperCalc",
      nameText: ""
    }
  }

  addMultiplyer(string) {
    let symbols = "+*-/".split("")
    for(let i=0; i<string.length; i++) {
      if (string[i] === ")" && !symbols.includes(string[i+1])) {
        string = string.substr(0, i) + ")*" + string.substr(i+1, string.length-1)
      }
    }
    return string
  }

  errors(string) {
    let parenths = 0
    let symbols = "+-*/".split("")
    if (symbols.includes(string[0]) || symbols.includes(string[string.length-1])) return true
    for(let i=0; i<string.length; i++) {
      if (string[i] === "(") parenths ++
      if (string[i] === ")") parenths --
      if (string[i] === "+" && symbols.includes(string[i+1]) && symbols.includes(string[i-1])) return true
      if (string[i] === "-" && symbols.includes(string[i+1]) && symbols.includes(string[i-1])) return true
      if (string[i] === "*" && symbols.includes(string[i+1]) && symbols.includes(string[i-1])) return true
      if (string[i] === "/" && symbols.includes(string[i+1]) && symbols.includes(string[i-1])) return true
    }
    if (parenths !== 0) return true
    return false
  }

  evalSolution() {
    let arithString = ""
    let skipLetters = "sintancos".split("")
    console.log(this.state.solution);
    String(this.state.solution).split("").forEach(char => {
      if (char !== " ") {
        if (char === "i") arithString += "Math.sin"
        if (char === "t") arithString += "Math.tan"
        if (char === "c") arithString += "Math.cos"
        if (!skipLetters.includes(char)) arithString += char
      }
    })
    console.log(arithString)
    console.log(this.errors(arithString));
    arithString = this.addMultiplyer(arithString)
    if (this.errors(arithString)) {
      this.setState({solution: "error"})
      setTimeout(() => {
        this.setState({solution: arithString})
      }, 2000)
    } else {
      this.setState({solution: safeEval(arithString)})
    }
  }

  changeName(e) {
    console.log(e);
    e.preventDefault()
    this.setState({name: this.state.nameText})
  }

  onChange(e) {
    console.log(e.target.value);
    this.setState({nameText: e.target.value})
  }

  unhideName() {
    let nameForm = document.querySelector(".name-form")
    Array.from(nameForm.classList).includes("hidden") ? nameForm.classList.remove("hidden") : nameForm.classList.add("hidden")
  }

  unhideBackgroundColor() {
    let nameForm = document.querySelector(".choose-color-container")
    Array.from(nameForm.classList).includes("hidden") ? nameForm.classList.remove("hidden") : nameForm.classList.add("hidden")
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="centering-container">
            <div className="customizations-container">
              <div className="customize-title"> Customize Your Calculator </div>
              <div className="customizations-forms-container">
                <div className="name-container">
                  <div onClick={() => this.unhideName()} className="name">Name Your Calculator</div>
                  <form onSubmit={e => this.changeName(e)} className="name-form hidden">
                    <input onChange={e => this.onChange(e)} value={this.state.nameText} placeholder="SuperCalc"/>
                    <input type="submit" value="Name"/>
                  </form>
                </div>
                <div className="colors-container">
                  <div onClick={() => this.unhideBackgroundColor()} className="color-title">CHange Background Color</div>
                  <div className="choose-color-container hidden">
                    <div className="black"></div>
                    <div className="orange"></div>
                    <div className="blue"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="calc-container">
              <div className="calc-name">{this.state.name}</div>
              <div className="solutions">
                <div className="center-text" placeholder=".0">{this.state.solution}</div>
              </div>
              <div className="calc-functions-container">
                <div className="calc-row-one">
                  <div onClick={() => this.setState({solution: (this.state.solution + " (")})}>(</div>
                  <div onClick={() => this.setState({solution: (this.state.solution + ") ")})}>)</div>
                  <div onClick={() => this.setState({solution: (this.state.solution + "-")})}>+/-</div>
                  <div onClick={() => this.setState({solution: ""})}>AC</div>
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
                  <div onClick={() => this.setState({solution: (this.state.solution + " * ")})}>*</div>
                </div>
                <div className="calc-row-four">
                  <div onClick={() => this.setState({solution: (this.state.solution + "1")})}>1</div>
                  <div onClick={() => this.setState({solution: (this.state.solution + "2")})}>2</div>
                  <div onClick={() => this.setState({solution: (this.state.solution + "3")})}>3</div>
                  <div onClick={() => this.setState({solution: (this.state.solution + " - ")})}>-</div>
                </div>
                <div className="calc-row-five">
                  <div onClick={() => this.setState({solution: (this.state.solution + "0")})}>0</div>
                  <div onClick={() => this.setState({solution: (this.state.solution + ".")})}>.</div>
                  <div onClick={() => this.evalSolution()}>=</div>
                  <div onClick={() => this.setState({solution: (this.state.solution + " + ")})}>+</div>
                </div>
                <div className="calc-row-six">
                  <div onClick={() => this.setState({solution: (this.state.solution + " sin(")})}>sin</div>
                  <div onClick={() => this.setState({solution: (this.state.solution + " cos(")})}>cos</div>
                  <div onClick={() => this.setState({solution: (this.state.solution + " tan(")})}>tan</div>
                  <div onClick={() => this.setState({solution: (this.state.solution.substr(0, this.state.solution.length-1))})}>del</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
