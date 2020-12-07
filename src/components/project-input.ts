import { AutoBind } from '../decorators/autobind'
import { Validatable, validate } from '../util/validation'
import { Component } from './base-components'
import { projectState } from '../state/project-state'

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input')

    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement
    this.peopleInputElement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement

    this.configure()
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value
    const enteredDescription = this.descriptionInputElement.value
    const enteredPeople = this.peopleInputElement.value

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    }

    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    }

    const peopleValidatable: Validatable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 10,
    }

    if (
      validate(titleValidatable) &&
      validate(descriptionValidatable) &&
      validate(peopleValidatable)
    ) {
      this.clearAllInputs()
      return [enteredTitle, enteredDescription, +enteredPeople]
    } else {
      alert('Invalid Input, please try again')
      return
    }
  }

  private clearAllInputs() {
    this.titleInputElement.value = ''
    this.descriptionInputElement.value = ''
    this.peopleInputElement.value = ''
  }

  @AutoBind
  private submitHandler(event: Event) {
    event.preventDefault()
    const userInput = this.gatherUserInput()
    if (Array.isArray(userInput)) {
      projectState.addProject(...userInput)
      this.clearAllInputs()
    }
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }

  renderContent() {}
}
