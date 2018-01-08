/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Check that each feed in the allFeeds object has a URL 
         * defined and that the URL is not empty.
         */
        it('have non-empty URLs', function () {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have non-empty names', function () {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            }
        });
    });


    describe('The menu', function () {
        let body, icon;
        beforeAll(function () {
            body = document.querySelector('body');
            icon = document.querySelector('.menu-icon-link');
        });

        /* Ensure the menu element is hidden by default.
         */
        it('is hidden by default', function () {
            expect(body.classList).toContain('menu-hidden');
        });

        /* Ensure the menu changes visibility when the menu icon
         * is clicked, and hides when clicked again.
         */
        it('appears and disappears when the menu icon is clicked', function () {
            icon.click();
            expect(body.classList).not.toContain('menu-hidden');
            icon.click();
            expect(body.classList).toContain('menu-hidden');
        });
    });

    describe('Initial Entries', function () {
        /* Ensure that after loadFeed completes its work, there is
         * at least one .entry element within the .feed container.
         */
        beforeEach(function (done) {
            loadFeed(0, () => done());
        });

        it('loads at least one entry', function () {
            const feed = document.querySelector('.feed');
            const entries = feed.querySelectorAll('.entry');
            expect(entries.length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function () {
        beforeEach(function (done) {
            loadFeed(0, () => done());
        });
        /* Ensure that when a new feed is loaded by loadFeed
         * the content actually changes.
         */
        describe('feed content', function () {
            let titleText;

            beforeEach(function (done) {
                const firstEntryTitle = document.querySelector('.feed .entry h2');
                titleText = firstEntryTitle.textContent;
                loadFeed(1, () => done());
            });

            it('changes after loading with a different id', function () {
                const firstEntryTitle = document.querySelector('.feed .entry h2');
                let newTitleText = firstEntryTitle.textContent;
                expect(titleText).not.toEqual(newTitleText);
            });
        });
    });

    describe('formLoad', function () {
        beforeEach(function (done) {
            loadFeed(0, () => done());
        });

        describe('out-of-bounds access', function () {
            let titleText;

            beforeEach(function (done) {
                const firstEntryTitle = document.querySelector('.feed .entry h2');
                titleText = firstEntryTitle.textContent;
                // Out of bounds access
                loadFeed(allFeeds.length, () => done());
            });

            it('will ignore out-of-bounds access', function () {
                const firstEntryTitle = document.querySelector('.feed .entry h2');
                let newTitleText = firstEntryTitle.textContent;
                // Since the requested id was invalid, the page shouldn't update.
                expect(titleText).toEqual(newTitleText);
            });
        });

        describe('undefined parameters', function () {
            let titleText;

            beforeEach(function (done) {
                const firstEntryTitle = document.querySelector('.feed .entry h2');
                titleText = firstEntryTitle.textContent;

                allFeeds.push({});  // Add a new, broken feed at the end.
                loadFeed(allFeeds.length - 1, () => done());
            });

            it('will ignore incompletely defined feeds', function () {
                const firstEntryTitle = document.querySelector('.feed .entry h2');
                let newTitleText = firstEntryTitle.textContent;
                // Since the requested id was invalid, the page shouldn't update.
                expect(titleText).toEqual(newTitleText);
            });
        });
    });
}());
