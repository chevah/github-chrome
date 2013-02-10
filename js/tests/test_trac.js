var assert = chai.assert;

//tdd: suite(), test(), setup(), and teardown().
//bdd:  describe(), it(), before(), after(), beforeEach(), and afterEach():

suite('Trac Helpers', function(){
  setup(function(){
    // ...
  });


  suite('getTracTicket()', function(){

    test('Return null when the value is not present.', function(){
      assert.isNull(getTracTicket('no ticket'));
    });

    test('Return the ticket as string if found in the input.', function(){
      assert.strictEqual('123', getTracTicket('[#123] Some text'));
    });

  });


  suite('getTracTicketFromPullURL()', function(){

    test('Returns null if pull url does not contain a ticket.', function(){
        assert.isNull(getTracTicketFromPullURL(
            '/chevah/empirical/pull/new/chevah:master...branch-name'));
    });

    test('Returns ticket id as string from pull url.', function(){
        assert.strictEqual('123', getTracTicketFromPullURL(
            '/chevah/empirical/pull/new/chevah:master...123-branch-name'));
    });

  });


  suite('generateTracLink()', function(){

    test('Returns a full link.', function(){
        var configuration = {trac_url: 'http://ceva'};
        assert.equal(
            ' (trac:<a href="http://ceva/ticket/223">#223</a>) ',
            generateTracLink('223', configuration));
    });

  });


});
