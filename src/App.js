import React, { Component } from 'react';
import safeEval from 'safe-eval'
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      solution: " ",
      name: "MyCalc",
      nameText: "",
      oldSolution: ""
    }
  }

  addMultiplyer(string) {
    let symbols = "+*-/".split("")
    for(let i=0; i<string.length; i++) {
      if (string[i] === ")" && !symbols.includes(string[i+1]) && i !== string.length-1) {
        string = string.substr(0, i) + ")*" + string.substr(i+1, string.length-1)
      }
    }
    return string
  }

  makeNegative() {
    let numbers = "1234567890".split("")
    let string = String(this.state.solution)
    let splitString = string.split("")
    if(string[0] === " " && string[1] === "-") {
      string = string.substr(2, string.length)
      return this.setState({solution: string})
    }
    if(string[0] === "-") {
      string = string.substr(1, string.length)
      return this.setState({solution: string})
    }
    if(!splitString.includes("+") && !splitString.includes("-") && !splitString.includes("*") && !splitString.includes("/")) {
      string = "-" + string.substr(0, string.length)
      return this.setState({solution: string})
    }


    if (!numbers.includes(string[string.length-1])) return
    for(let i=string.length-1; i>0; i--){
      if (!numbers.includes(string[i])) {
        string[i] === "-" ? string = string.substr(0, i) + string.substr(i+1, string.length) : string = string.substr(0, i+1) + "-" + string.substr(i+1, string.length)
        console.log("here");
        return this.setState({solution: string})
      }
    }
  }

  errors(string) {
    let parenths = 0
    let symbols = "+*/".split("")
    let firstSymbols = "+*/".split("")
    let isError = false
    if (firstSymbols.includes(string[0]) || symbols.includes(string[string.length-1])) return true
    for(let i=0; i<string.length; i++) {
      console.log(string[i]);
      if (string[i] === "(") parenths ++
      if (string[i] === ")") parenths --
      if ((symbols.includes(string[i]) && symbols.includes(string[i+1])) || (symbols.includes(string[i]) && symbols.includes(string[i+1]))) return true
    }
    console.log(parenths);
    if (parenths !== 0) return true
    return isError
  }

  evalSolution() {
    let arithString = ""
    let skipLetters = "sintancos".split("")
    this.setState({oldSolution: String(this.state.solution)})
    String(this.state.solution).split("").forEach(char => {
      if (char !== " ") {
        if (char === "i") arithString += "Math.sin"
        if (char === "t") arithString += "Math.tan"
        if (char === "c") arithString += "Math.cos"
        if (!skipLetters.includes(char)) arithString += char
      }
    })
    arithString = this.addMultiplyer(arithString)
    console.log(this.errors(arithString));
    if (this.errors(arithString)) {
      this.setState({solution: "error"})
      setTimeout(() => {
        this.setState({solution: this.state.oldSolution})
      }, 2000)
    } else {
      this.setState({solution: safeEval(arithString)})
    }
  }

  changeName(e) {
    e.preventDefault()
    this.setState({name: this.state.nameText})
    this.unhideName()
  }

  onChange(e) {
    this.setState({nameText: e.target.value})
  }

  unhideName() {
    let nameForm = document.querySelector(".name-form")
    Array.from(nameForm.classList).includes("hidden") ? nameForm.classList.remove("hidden") : nameForm.classList.add("hidden")
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="centering-container">
            <div className="calc-container">
              <div className="make-smaller-container">
                <div className="calc-name">
                  <div className="calc-name-text" onClick={() => this.unhideName()}>{this.state.name}</div>
                  <form onSubmit={e => this.changeName(e)} className="name-form hidden">
                    <input type="text" onChange={e => this.onChange(e)} value={this.state.nameText} placeholder="MyCalc"/>
                    <input type="submit" value="Name"/>
                  </form>
                </div>
                <div className="calc-functions-container">
                  <div className="solutions">
                    <div className="center-text" placeholder=".0">{this.state.solution}</div>
                  </div>
                  <div className="calc-row-one">
                    <div id="special" className="first-row-border" onClick={() => this.setState({solution: (this.state.solution + " (")})}>(</div>
                    <div id="special" onClick={() => this.setState({solution: (this.state.solution + ") ")})}>)</div>
                    <div id="special" onClick={() => this.makeNegative()}>+/-</div>
                    <div id="special" className="last-border" onClick={() => this.setState({solution: ""})}>AC</div>
                  </div>
                  <div className="calc-row-two">
                    <div className="first-row-border" onClick={() => this.setState({solution: (this.state.solution + "7")})}>7</div>
                    <div onClick={() => this.setState({solution: (this.state.solution + "8")})}>8</div>
                    <div onClick={() => this.setState({solution: (this.state.solution + "9")})}>9</div>
                    <div id="special" className="last-border" onClick={() => this.setState({solution: (this.state.solution + "/")})}>/</div>
                  </div>
                  <div className="calc-row-three">
                    <div className="first-row-border" onClick={() => this.setState({solution: (this.state.solution + "4")})}>4</div>
                    <div onClick={() => this.setState({solution: (this.state.solution + "5")})}>5</div>
                    <div onClick={() => this.setState({solution: (this.state.solution + "6")})}>6</div>
                    <div id="special" className="last-border" onClick={() => this.setState({solution: (this.state.solution + " * ")})}>*</div>
                  </div>
                  <div className="calc-row-four">
                    <div className="first-row-border" onClick={() => this.setState({solution: (this.state.solution + "1")})}>1</div>
                    <div onClick={() => this.setState({solution: (this.state.solution + "2")})}>2</div>
                    <div onClick={() => this.setState({solution: (this.state.solution + "3")})}>3</div>
                    <div id="special" className="last-border" onClick={() => this.setState({solution: (this.state.solution + " - ")})}>-</div>
                  </div>
                  <div className="calc-row-five">
                    <div className="first-row-border" onClick={() => this.setState({solution: (this.state.solution + "0")})}>0</div>
                    <div onClick={() => this.setState({solution: (this.state.solution + ".")})}>.</div>
                    <div id="equal-sign" onClick={() => this.evalSolution()}>=</div>
                    <div id="special" className="last-border" onClick={() => this.setState({solution: (this.state.solution + " + ")})}>+</div>
                  </div>
                  <div className="calc-row-six">
                    <div className="first-row-border bottom-border" onClick={() => this.setState({solution: (this.state.solution + " sin(")})}>sin</div>
                    <div className="last-border bottom-border" onClick={() => this.setState({solution: (this.state.solution + " cos(")})}>cos</div>
                    <div className="last-border bottom-border" onClick={() => this.setState({solution: (this.state.solution + " tan(")})}>tan</div>
                    <div id="special" className="del-image last-border special bottom-border" onClick={() => this.setState({solution: (this.state.solution.substr(0, this.state.solution.length-1))})}><img src="https://cdn4.iconfinder.com/data/icons/flat-icons-in-blue/201/Backspace1.png" style={{height: "25px", width: "25px"}} alt="delete"/></div>
                  </div>
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
