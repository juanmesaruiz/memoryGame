import * as randomHelper from '../randomHelper'

import { minNumberRandom } from '../../config/constants'

describe('randomHelper', () => {
  describe('getRandom', () => {
    it('generates correct number with min ', () => {
      const number = randomHelper.getRandom(3, 0)
      const expected = number >= 0 && number <= 3

      expect(expected).toBe(true)
    })
    it('generates correct number without min ', () => {
      const number = randomHelper.getRandom(3)
      const expected = number >= minNumberRandom && number <= 3

      expect(expected).toBe(true)
    })
  })
})
