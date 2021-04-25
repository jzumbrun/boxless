import { Component, ChangeEvent } from 'react'

interface IFormComponent extends Component {
  state: {
    form: Record<string,string | boolean>
  }
}

class Form {
  /**
  * Handle Change
  * this is object's this
  */
  static handleChange (component: IFormComponent , field: string, e: ChangeEvent<HTMLInputElement> | string, callback: () => void) {
    // Fast shallow copy
    var form = Object.assign({}, component.state.form)
    if (typeof e !== "string") {
      form[field] = e.target.value
      if (e.target.type === 'checkbox') {
        form[field] = e.target.checked
      }
    } else {
      form[field] = e
    }

    component.setState({ form: form }, callback || (() => {}))
  }
}

export default Form
