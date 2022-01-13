// Could try
//
// 1. Fetch gcodes from web
// 2. Create a dictionary of info...
// 3. Properties
//   1. Code
//   2. Friendly name
//   3. Method name
//   4. Parameters -> what's optional and what type
//

interface Dictionary {
  entries: Entry[]
}

interface Entry {
  code: string
  friendlyName: string
  // where a human can find out more
  source: string
  methodName: string
  parameters: parameter[]
}

interface Parameter {
  name: string
  type: ParameterType
}

enum ParameterType {
  // existence of parameter sets it, e.g. a boolean
  OPTION = 'option',
  NUMBER = 'number',
  STRING = 'string'
}
