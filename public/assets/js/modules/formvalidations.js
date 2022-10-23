export function validate(input) {
  const inputType = input.dataset.input
  
  if (input.validity.valid) {
    input.classList.remove('input--error')
    input.nextElementSibling.innerHTML = ''
  } else {
    input.classList.add('input--error')
    input.nextElementSibling.innerHTML = showErrorMsg(inputType, input)
  }
}

// export function checkLength(input) {
//   if (input.value.length < input.maxLength) {
//     input.classList.remove('error')
//     input.nextElementSibling.innerHTML = ''
//   } else {
//     input.classList.add('error')
//     input.nextElementSibling.innerHTML = 'O limite de caracteres foi alcançado.'
//   }
// }

function showErrorMsg(inputType, input) {
  let message = ''

  errorTypes.forEach(error => {
    if (input.validity[error]) {
      message = errorMsgs[inputType][error]
    }
  })

  return message
}

const errorTypes = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'customError'
]

const valueMissing = 'O campo não pode estar vazio.'

const errorMsgs = {
  email: {
    valueMissing: valueMissing,
    typeMismatch: 'O email digitado não é válido.',
    patternMismatch: 'O email digitado não é válido.'
  },
  pass: {
    valueMissing: valueMissing,
    patternMismatch:
      'A senha deve conter entre 6 e 12 caracteres e deve incluir, pelo menos, uma letra maiúscula, um número e não deve conter símbolos.'
  },
  // contact: {
  //   valueMissing: valueMissing
  // },
  name: {
    valueMissing: valueMissing
  },
  imgurl: {
    valueMissing: valueMissing
  },
  price: {
    valueMissing: valueMissing
  },
  description: {
    valueMissing: valueMissing
  },
  alternative: {
    valueMissing: valueMissing
  },
  category: {
    valueMissing: valueMissing
  }
}

