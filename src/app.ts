import { ProjectInput } from './components/project-input'
import { ProjectList } from './components/project-list'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'


new ProjectInput()
new ProjectList('active')
new ProjectList('finished')

console.log(_.shuffle([1,2,3,4]))
console.log(uuidv4())
