import React from 'react'
import renderer from 'react-test-renderer'
import LangMenuButton from '../../../components/Layout/LangMenuButton'

jest.mock('@material-ui/core/Menu', () => (props) => <div id="menu" {...props} />)

const mockI18n = {
  t: (key: string) => key,
  lang: 'en',
}
jest.mock('next-translate/useTranslation', () => () => mockI18n)
jest.mock('next/router', () => ({
  useRouter: () => ({
    locales: ['en', 'zh'],
    pathname: '/app/home',
    query: { key: 'val' },
  }),
}))

describe('component: Layout - LangMenuButton', () => {
  it('renders en correctly', () => {
    const component = renderer.create(<LangMenuButton width={10} height={10} fill="#000" />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders zh correctly', () => {
    mockI18n.lang = 'zh'
    const component = renderer.create(<LangMenuButton width={10} height={10} fill="#000" />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders menu correctly', () => {
    const component = renderer.create(<LangMenuButton width={10} height={10} fill="#000" />)
    renderer.act(() => {
      component.root.findByType('button').props.onClick({ currentTarget: 'button' })
    })
    const menuOpenedTree = component.toJSON()
    expect(menuOpenedTree).toMatchSnapshot()
    renderer.act(() => {
      component.root.findByProps({ id: 'menu' }).props.onClose()
    })
    const menuClosedTree = component.toJSON()
    expect(menuClosedTree).toMatchSnapshot()
  })
})

afterEach(() => {
  mockI18n.lang = 'en'
  jest.clearAllMocks()
})
