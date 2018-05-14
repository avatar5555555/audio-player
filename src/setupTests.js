import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// See https://github.com/akiran/react-slick#test-setup
window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener() {},
      removeListener() {}
    }
  }

configure({ adapter: new Adapter() })
