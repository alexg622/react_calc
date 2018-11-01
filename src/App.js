import React, { Component } from 'react';
import safeEval from 'safe-eval'
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      solution: "",
      name: "MyCalc",
      nameText: "MyCalc",
      oldSolution: "",
      // makes it so user cant type when the error message is showing
      active: true
    }
  }

  componentDidMount() {
    // addEventListeners for key presses so user can type in math problems
    document.addEventListener("keypress", e => {
      if(this.state.active) {
        if(e.keyCode === 49) this.setState({solution: this.state.solution + "1"})
        if(e.keyCode === 50) this.setState({solution: this.state.solution + "2"})
        if(e.keyCode === 51) this.setState({solution: this.state.solution + "3"})
        if(e.keyCode === 52) this.setState({solution: this.state.solution + "4"})
        if(e.keyCode === 53) this.setState({solution: this.state.solution + "5"})
        if(e.keyCode === 54) this.setState({solution: this.state.solution + "6"})
        if(e.keyCode === 55) this.setState({solution: this.state.solution + "7"})
        if(e.keyCode === 56) this.setState({solution: this.state.solution + "8"})
        if(e.keyCode === 57) this.setState({solution: this.state.solution + "9"})
        if(e.keyCode === 48) this.setState({solution: this.state.solution + "0"})
        if(e.keyCode === 45) this.setState({solution: this.state.solution + " - "})
        if(e.keyCode === 40) this.setState({solution: this.state.solution + " ("})
        if(e.keyCode === 41) this.setState({solution: this.state.solution + ") "})
        if(e.keyCode === 43) this.setState({solution: this.state.solution + " + "})
        if(e.keyCode === 47) this.setState({solution: this.state.solution + " / "})
        if(e.keyCode === 42) this.setState({solution: this.state.solution + " * "})
        if(e.keyCode === 13) {
          this.evalSolution()
          this.setState({active: false})
          setTimeout(() => {
            this.setState({active: true})
          }, 3000)
        }
        if(e.keyCode === 46) this.setState({solution: this.state.solution + "."})
      }
    })
    document.addEventListener("keydown", e => {
      if(this.state.active) {
        if(e.keyCode === 8) this.setState({solution: (String(this.state.solution).substr(0, String(this.state.solution).length-1))})
      }
    })
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
    // lets user make a number negative or positive after they typed it in
    let numbers = "1234567890".split("")
    let string = String(this.state.solution)
    let splitString = string.split("")
    if(string[0] === " " && string[1] === "-") {
      string = string.substr(2, string.length)
      return this.setState({solution: string})
    }
    if(string[0] === "-" && !splitString.includes(" ")) {
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
      if (string[i] === "(") parenths ++
      if (string[i] === ")") parenths --
      if ((symbols.includes(string[i]) && symbols.includes(string[i+1])) || (symbols.includes(string[i]) && symbols.includes(string[i+1]))) return true
    }
    if (parenths !== 0) return true
    return isError
  }

  evalSolution() {
    // returns the solution
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
    if (this.errors(arithString)) {
      this.setState({solution: "error"})
      setTimeout(() => {
        this.setState({solution: this.state.oldSolution})
      }, 2000)
    } else {
      try {
        this.setState({solution: safeEval(arithString)})
      } catch(err) {
        this.setState({solution: "error"})
        setTimeout(() => {
          this.setState({solution: this.state.oldSolution})
        }, 2000)
      }
    }
  }

  changeName(e) {
    // Changes name of calculator
    e.preventDefault()
    this.setState({name: this.state.nameText})
    this.toggleNameForm()
  }

  onChange(e) {
    this.setState({nameText: e.target.value})
  }

  toggleNameForm() {
    let nameForm = document.querySelector(".name-form")
    if (Array.from(nameForm.classList).includes("hidden")) {
      nameForm.classList.remove("hidden")
      this.setState({active: false})
    } else {
      nameForm.classList.add("hidden")
      this.setState({active: true})
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="centering-container">
            <div className="calc-container">
              <div className="make-smaller-container">
                <div className="calc-name">
                  <div className="calc-name-text" onClick={() => this.toggleNameForm()}>{this.state.name}</div>
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
                    <div id="special" className="last-border" onClick={() => this.setState({solution: (this.state.solution + " / ")})}>/</div>
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
