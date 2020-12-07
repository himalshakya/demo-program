import { Draggable } from '../models/drag-drop'
import { Project } from '../models/project'
import { Component } from '../components/base-components'
import { AutoBind } from '../decorators/autobind'

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable {
  private project: Project;
  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id)
    this.project = project

    this.configure()
    this.renderContent()
  }

  get persons() {
    return this.project.people === 1
      ? '1 person'
      : `${this.project.people} people`
  }

  @AutoBind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData('text/plain', this.project.id)
    event.dataTransfer!.effectAllowed = 'move'
  }

  dragEndHandler(_: DragEvent): void {
    console.log('Drag End...')
  }

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler)
    this.element.addEventListener('dragend', this.dragEndHandler)
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title
    this.element.querySelector('h3')!.textContent = `${this.persons} assigned`
    this.element.querySelector('p')!.textContent = this.project.description
  }
}
