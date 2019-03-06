const transformer = require('../util/transform-data');
const fixture = require('./fixtures/stock');

describe('transform data', () => {
  
  describe('get summary', () => {
    
    it('should return important values', () => {
      const result = transformer.getSummary(fixture.dataset);
      const expectedResult = [
        {
          date: '02.01.18',
          close: 172.26,
          max: 172.3,
          min: 169.26
        },
        {
          date: '03.01.18',
          close: 172.23,
          max: 174.55,
          min: 171.96
        },
        {
          date: '04.01.18',
          close: 173.03,
          max: 173.47,
          min: 172.08
        },
        {
          date: '05.01.18',
          close: 175,
          max: 175.37,
          min: 173.05
        }
      ];
      expect(result[0]).toHaveProperty('date', 'close', 'max', 'min');
      expect(result).toMatchObject(expectedResult);
    });
  });
  
  describe('calculate drawdown value', () => {
  
    it('should return drawdowns data', () => {
      const input = [
        {
          date: '02.01.18',
          close: 172.26,
          max: 172.3,
          min: 169.26
        },
        {
          date: '03.01.18',
          close: 172.23,
          max: 174.55,
          min: 171.96
        },
        {
          date: '04.01.18',
          close: 173.03,
          max: 173.47,
          min: 172.08
        },
        {
          date: '05.01.18',
          close: 175,
          max: 175.37,
          min: 173.05
        }
      ];
      const result = transformer.calDrawdown(input);
      expect(result[0]).toHaveProperty('drawdown');
      expect(result.map(r => r.drawdown)).toMatchObject(['1.8', '1.5', '1.3', '0.8']);
      
    });
  });
  
  describe('calculate return value', () => {
    
    it('should return return value data', () => {
      const input = [
        {
          date: '02.01.18',
          close: 172.26,
          max: 172.3,
          min: 169.26
        },
        {
          date: '03.01.18',
          close: 172.23,
          max: 174.55,
          min: 171.96
        },
        {
          date: '04.01.18',
          close: 173.03,
          max: 173.47,
          min: 172.08
        },
        {
          date: '05.01.18',
          close: 175.0,
          max: 175.37,
          min: 173.05
        }
      ];
      
      const result = transformer.calReturn(input);
      expect(result).toHaveProperty('startDate', 'endDate', 'fromValue', 'toValue', 'rate', 'percent');
      expect(result.rate).toEqual(2.740000000000009);
      expect(result.percent).toEqual('+1.6');
    });
  });
  
});