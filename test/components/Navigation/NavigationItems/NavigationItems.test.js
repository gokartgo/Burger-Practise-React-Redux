import React from 'react'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NavigationItems from '../../../../src/components/Navigation/NavigationItems/NavigationItems'

configure({ adapter: new Adapter() })

jest.mock(
	'../../../../src/components/Navigation/NavigationItems/NavigationItem/NavigationItem',
	() => 'NavigationItem',
)

describe('<NavigationItems />', () => {
	let wrapper

	beforeEach(() => {
		wrapper = shallow(<NavigationItems />)
	})

	it('should render two <NavigationItem /> elements if not authenticated', () => {
		expect(wrapper.find('NavigationItem')).toHaveLength(2)
	})

	it('should render three <NavigationItem /> elements if authenticated', () => {
		wrapper.setProps({ isAuthenticated: true })
		expect(wrapper.find('NavigationItem')).toHaveLength(3)
	})

	it('should render three <NavigationItem /> elements if authenticated', () => {
		const NavigationItem = 'NavigationItem'
		wrapper.setProps({ isAuthenticated: true })
		expect(
			wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>),
		).toEqual(true)
	})
})
