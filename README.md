# React Password Strength ![build status](https://codeship.com/projects/0fd512b0-c9f6-0134-86e7-125925b29f4b/status?branch=master)

A password strength indicator field using [zxcvbn](https://github.com/dropbox/zxcvbn) to calculate a password strength score.

_NOTE: zxcvbn is a large library it's recommended you split the codebase to manage bundle size._

[Try it live!](https://mmw.github.io/react-password-strength/)

## Install in your project

`npm install --save react-password-strength`

_Note: react/react-dom is a peer dependency. You should be using this in a React project._

## Run the example locally

- `npm install`
- `npm start`
- open [http://localhost:8080/](http://localhost:8080/)

## Using the tool

```
<ReactPasswordStrength
  className="customClass"
  style={{ display: 'none' }}
  minLength={5}
  minScore={2}
  scoreWords={['weak', 'okay', 'good', 'strong', 'stronger']}
  changeCallback={foo}
  inputProps={{ name: "password_input", autoComplete: "off", className: "form-control" }}
/>
```

### Importing

If using ES6 imports:
`import ReactPasswordStrength from 'react-password-strength';`

Using CommonJS require:
`var ReactPasswordStrength = require('react-password-strength');`

Using in a Universal JS App (server-side rendering):
- `import ReactPasswordStrength from 'react-password-strength/dist/universal';`
- Include default styling from `react-password-strength/dist/style.css`.

### Props

#### ClassName

- ClassName to render with default container classes

#### Style

- Style object to customize container

#### minLength (Default: 5)

- Minimum password length acceptable for password to be considered valid

#### minScore (Default: 2)

- Minimum score acceptable for password to be considered valid
- Scale from 0 - 4 denoting too guessable to very unguessable
- See [zxcvbn](https://github.com/dropbox/zxcvbn) docs for more detail

#### scoreWords (Default: ['weak', 'weak', 'okay', 'good', 'strong'])

- An array denoting the words used to describe respective score values in the UI

#### tooShortWord (Default: 'too short')

- A string to describe when password is too short (based on minLength prop).

#### changeCallback

- Callback after input has changed (and score was recomputed)
- React Password Strength passes two objects to the callback function:
    - current app state (`score`, `password`, `isValid`)
    - full result produced by [zxcvbn](https://github.com/dropbox/zxcvbn) including `feedback` (see docs for more properties)

#### inputProps

- Props to pass down to the `input` element of the component. Things like `name`, `id`, etc
- Protected props: `className`, `onChange`, `ref`, `value`
  - Passing in `className` will amend to the existing classes
  - The remaining props will be ignored

#### defaultValue

- A default value to set for the password field. If a non-empty string is provided the `changeCallback` will be called in `componentDidMount`.

#### userInputs

- An array of strings that zxcvbn will treat as an extra dictionary.

### Classes

_All styling is applied with CSS classes to allow custom styling and overriding._
- `ReactPasswordStrength` - namespace class and component wrapper
- `is-strength-{0-4}` - modifier class indicating password strength
- `ReactPasswordStrength-input` - password input field
- `is-password-valid` - modifier class indicating valid password
- `is-password-invalid` - modifier class indicating invalid password (only applies if password length > 0)
- `ReactPasswordStrength-strength-bar` - color bar indicating password strength
- `ReactPasswordStrength-strength-desc` - text indicating password strength


### Functions

_Access through `ref` handle of ReactPasswordStrength._
- `clear` - reset password field to initial state
