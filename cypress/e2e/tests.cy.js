describe('TEST1: Search Functionality', () => {
  it('checks that every displayed track name contains the search term', () => {
	cy.visit('/');
    const searchTrack = Cypress.env('SEARCH_TRACK_1');

    cy.get('input.MuiInputBase-input').type(searchTrack);

    cy.get('#tracklist')
      .find('div.MuiGrid-grid-xs-4 p')
      .each($el => {
        cy.wrap($el)
          .invoke('text')
          .then(text => {
            expect(text.toLowerCase()).to.include(searchTrack.toLowerCase());
          });
      });
  });
});


describe('TEST2: Add Track Functionality', () => {
  it('adds a single track using the "+" button', () => {
	cy.visit('/');
    const searchTrack = Cypress.env('SEARCH_TRACK_2');

	addTrack(searchTrack);

    cy.get('#playlist')
      .should('contain.text', searchTrack);
  });
});


describe('TEST3: Verify Total Duration of Playlist', () => {
  it('calculates the total duration in seconds correctly', () => {
	cy.visit('/');
    const searchTrack = Cypress.env('SEARCH_TRACK_3').split(',');

    let duration = 0;

    searchTrack.forEach(track => {
     addTrack(track);
    });

    cy.get('#playlist')
      .find('div.MuiGrid-grid-xs-2 p')
      .each($el => {
        const durationText = $el.text().trim();
        const [minutes, seconds] = durationText.split(':').map(Number);
        duration += minutes * 60 + seconds;
      })
      .then(() => {
        cy.get('#playlist-duration') 
          .invoke('text')
          .then(displayedTotal => {
            const displayedSeconds = Number(displayedTotal.trim());
            expect(displayedSeconds).to.eq(duration);
          });
      });
  });
});




function addTrack(trackName) {
  cy.get('#tracklist')
    .find('div.MuiGrid-grid-xs-4 p')
    .contains(trackName)
    .parents('.MuiGrid-container')
    .within(() => {
      cy.get('button').contains('+').click();
    });
}
