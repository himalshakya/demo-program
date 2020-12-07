export interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function validate(validatbleInput: Validatable) {
  let isValid = true
  if (validatbleInput.required) {
    isValid = isValid && validatbleInput.value.toString().trim().length !== 0
  }

  if (
    validatbleInput.minLength != null &&
    typeof validatbleInput.value === 'string'
  ) {
    isValid =
      isValid &&
      validatbleInput.value.toString().trim().length >=
        validatbleInput.minLength
  }

  if (
    validatbleInput.maxLength != null &&
    typeof validatbleInput.value === 'string'
  ) {
    isValid =
      isValid &&
      validatbleInput.value.toString().trim().length <=
        validatbleInput.maxLength
  }

  if (
    validatbleInput.min != null &&
    typeof validatbleInput.value === 'number'
  ) {
    isValid = isValid && validatbleInput.value >= validatbleInput.min
  }

  if (
    validatbleInput.max != null &&
    typeof validatbleInput.value === 'number'
  ) {
    isValid = isValid && validatbleInput.value <= validatbleInput.max
  }
  return isValid
}
