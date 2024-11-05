describe('First test', function () {
  let variable: any;
  beforeEach(() => {
    variable = {};
  });

  it('should return true if a is true', function(){
    // arrage
    variable.a = false;

    // act
    variable.a = true;

    // assert
    expect(variable.a).toBe(true);
  });
});
