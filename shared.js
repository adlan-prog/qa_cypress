import meUser from '/cypress/fixtures/me-user.json';
import { generateFakeArticle } from '../integration/article.spec';


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

    // open editor
    
    // 2. issue need to check ```cy.get('article-list').should('be.visible');```
    
    cy.get('@appHeader').find('[ui-sref$="editor"]').click();
    cy.url().should('include', '/#/editor/');
    cy.get('.editor-page form').should('be.visible').as('articleForm');

    const article = generateFakeArticle(); // 3 issue. this const should be showing like global const here,
                                           // need delete const from here and type like global

    // fill form
    cy.get('@articleForm').find('input[ng-model$="title"]').type(article.title);
    cy.get('@articleForm').find('input[ng-model$="description"]').type(article.description);
    cy.get('@articleForm').find('textarea[ng-model$="body"]').type(article.body);
    cy.get('@articleForm').find('input[ng-model$="tagField"]').type(article.tags).type('{enter}');

    // save article
    cy.get('@articleForm').find('button').click();

};


export function checkMyArticles() {

    const article = generateFakeArticle(); // here is same problem

    cy.url().should('include', '/#/', article.title);
    cy.get('.article-page h1[ng-bind$="title"]').should('contain.value', article.title);
    cy.get('.article-content [ng-bind-html$="article.body"]').should('contain.value', article.body);
    cy.get('.article-content [ng-repeat$="tagList"]').should('contain.value', article.tags);

}

