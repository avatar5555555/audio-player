import React from 'react'
import { shallow, mount } from 'enzyme'
import toJSON from 'enzyme-to-json'

import List from './index'

const fakeProps = {
  onSelect: () => {},
  items: [{ trackId: '1' }]
}

describe('List', () => {
  it('renders', () => {
    shallow(<List {...fakeProps} />)
  })

  it('match snapshot', () => {
    expect(toJSON(shallow(<List {...fakeProps} />))).toMatchSnapshot()
  })

  it('color primary when currentTrack is the same as trackId', () => {
    const wrap = () => mount(<List {...fakeProps} currentTrackId={'1'} />)

    expect(
      wrap()
        .find('ListGroupItem')
        .props()
    ).toHaveProperty('color', 'primary')
  })

  it('color white when currentTrack is not the same as trackId', () => {
    const wrap = () => mount(<List {...fakeProps} currentTrackId={'2'} />)

    expect(
      wrap()
        .find('ListGroupItem')
        .props()
    ).toHaveProperty('color', 'white')
  })
})
