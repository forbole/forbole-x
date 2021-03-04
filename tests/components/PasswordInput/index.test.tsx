import React from 'react'
import renderer from 'react-test-renderer'
import PasswordInput from '../../../components/PasswordInput'

describe('component: PasswordInput', () => {
  it('renders correctly', () => {
    const component = renderer.create(<PasswordInput />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders correctly when password is shown', () => {
    const component = renderer.create(<PasswordInput />)
    renderer.act(() => {
      component.root.findByType('button').props.onClick()
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders correctly with low security level', () => {
    const component = renderer.create(<PasswordInput withSecurityLevel value="123" />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders correctly with medium security level', () => {
    const component = renderer.create(<PasswordInput withSecurityLevel value="123qweQWE" />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders correctly with high security level', () => {
    const component = renderer.create(<PasswordInput withSecurityLevel value="123qweQWE!@#" />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
