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
