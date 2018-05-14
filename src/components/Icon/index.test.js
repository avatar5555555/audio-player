import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import Icon, { icons } from './index'

const Images = Object.keys(icons)

describe('Icon', () => {
  it('renders all icons', () => {
    Images.forEach(icon => shallow(<Icon name={icon} />))
  })

  it('match all icons snapshots', () => {
    Images.forEach(icon =>
      expect(toJSON(shallow(<Icon name={icon} />))).toMatchSnapshot()
    )
  })

  it('match null snapshot', () => {
    expect(toJSON(shallow(<Icon />))).toMatchSnapshot()
  })
})
