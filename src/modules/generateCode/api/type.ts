export type GenerateCodeColumn = {
  name: string
  required: boolean
  is_primary: boolean
}

export type GenerateCodeField = {
  label: string
  column: string
  required: boolean
  is_primary: boolean
}

export type GenerateCodeExecuteRequest = {
  label: string
  name: string
  fields: GenerateCodeField[]
}
