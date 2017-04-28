import { TinyreproPage } from './app.po';

describe('tinyrepro App', () => {
  let page: TinyreproPage;

  beforeEach(() => {
    page = new TinyreproPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
