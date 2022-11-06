import meUser from '/cypress/fixtures/me-user.json';
import { generateFakeArticle } from '../integration/article.spec';



export function generateFakeArticle() {
    return {
        title: faker.lorem.words(6),
        description: faker.lorem.sentence(20),
        body: faker.lorem.text(300),
        tags: faker.lorem.words(3)
    };
}

export function login() {

    cy.get('@appHeader').find('a[href$="/login"]').click();
    cy.url().should('include', '/#/login');

    cy.get('.auth-page').should('be.visible').as('loginPage');
    cy.get('@loginPage').find('h1').should('have.text', 'Sign in');
    cy.get('@loginPage').find('form').should('be.visible').as('loginForm');

    cy.get('@loginForm').find('input[ng-model$=email]').type(meUser.email);
    cy.get('@loginForm').find('input[ng-model$=password]').type(meUser.password);
    cy.get('@loginForm').find('button[type=submit]').click();
    cy.get('@appHeader').should('contain.text', meUser.username);

};

export function addArticle() { 

    cy.get('@appHeader').find('[ui-sref$="editor"]').click();
    cy.url().should('include', '/#/editor/');
    cy.get('.editor-page form').should('be.visible').as('articleForm');

    const article = generateFakeArticle();

    // fill form
    cy.get('@articleForm').find('input[ng-model$="title"]').type(article.title);
    cy.get('@articleForm').find('input[ng-model$="description"]').type(article.description);
    cy.get('@articleForm').find('textarea[ng-model$="body"]').type(article.body);
    cy.get('@articleForm').find('input[ng-model$="tagField"]').type(article.tags).type('{enter}');

    // save article
    cy.get('@articleForm').find('button').click();

    cy.get('.article-page').should('be.visible');

    return article

};

