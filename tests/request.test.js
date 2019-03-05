const req = require('../util/request');

describe('request function', () => {
    
    describe('get_enddate', () => {
      it('should return return today if data is missing', () => {
        expect(req.get_end_date(['-', 'Jan', '12']).toDateString()).toMatch(new Date().toDateString());
      });
      
      it('should return return today if data is invalid', () => {
        expect(req.get_end_date(['-', 'slack', 12, 'axb']).toDateString()).toMatch(new Date().toDateString());
      });
      
      it('should return end date object if data correct', () => {
        const expectedDate = new Date('2019-01-12');
        console.log(expectedDate.toDateString());
        expect(req.get_end_date(['-', 'Jan', '12', '2019']).toDateString()).toMatch(expectedDate.toDateString());
      });
    });
});


