import { UniversityPage } from './app.po';

describe('university App', () => {
  let page: UniversityPage;

  beforeEach(() => {
    page = new UniversityPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
