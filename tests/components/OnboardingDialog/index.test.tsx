import React from 'react'
import renderer from 'react-test-renderer'
import OnboardingDialog from '../../../components/OnboardingDialog'

const onClose = jest.fn()

jest.mock('../../../components/PasswordInput', () => 'PasswordInput')
jest.mock('@material-ui/core/Dialog', () => (props) => <div id="dialog" {...props} />)

describe('component: OnboardingDialog', () => {
  it('renders open state correctly', () => {
    const component = renderer.create(<OnboardingDialog open onClose={onClose} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders closed state correctly', () => {
    const component = renderer.create(<OnboardingDialog open={false} onClose={onClose} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('calls onClose when IconButton is clicked', () => {
    const component = renderer.create(<OnboardingDialog open onClose={onClose} />)
    renderer.act(() => {
      component.root.findByProps({ className: 'MuiIconButton-label' }).parent.props.onClick()
    })
    expect(onClose).toBeCalled()
  })
  it('renders error state when submit invalid password', () => {
    const component = renderer.create(<OnboardingDialog open onClose={onClose} />)
    renderer.act(() => {
      component.root.findByProps({ variant: 'contained', color: 'primary' }).props.onClick()
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders confirming password state when submit valid password', () => {
    const component = renderer.create(<OnboardingDialog open onClose={onClose} />)
    renderer.act(() => {
      component.root
        .findByType('PasswordInput' as any)
        .props.onChange({ target: { value: '123456' } })
    })
    renderer.act(() => {
      component.root.findByProps({ variant: 'contained', color: 'primary' }).props.onClick()
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders error state when submit invalid confirm password', () => {
    const component = renderer.create(<OnboardingDialog open onClose={onClose} />)
    renderer.act(() => {
      component.root
        .findByType('PasswordInput' as any)
        .props.onChange({ target: { value: '123456' } })
    })
    renderer.act(() => {
      component.root.findByProps({ variant: 'contained', color: 'primary' }).props.onClick()
    })
    renderer.act(() => {
      component.root
        .findByType('PasswordInput' as any)
        .props.onChange({ target: { value: '123455' } })
    })
    renderer.act(() => {
      component.root.findByProps({ variant: 'contained', color: 'primary' }).props.onClick()
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders correctly when submit valid confirm password', () => {
    const component = renderer.create(<OnboardingDialog open onClose={onClose} />)
    renderer.act(() => {
      component.root
        .findByType('PasswordInput' as any)
        .props.onChange({ target: { value: '123456' } })
    })
    renderer.act(() => {
      component.root.findByProps({ variant: 'contained', color: 'primary' }).props.onClick()
    })
    renderer.act(() => {
      component.root
        .findByType('PasswordInput' as any)
        .props.onChange({ target: { value: '123456' } })
    })
    renderer.act(() => {
      component.root.findByProps({ variant: 'contained', color: 'primary' }).props.onClick()
    })
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

afterEach(() => {
  jest.clearAllMocks()
})
