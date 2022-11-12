import meUser from '../fixtures/me-user.json';
import { generateFakeArticle } from '../../js_examples/faker.mjs';

const article = generateFakeArticle();

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

    cy.get('@appHeader').find('[ui-sref$="editor"]').click();
    cy.url().should('include', '/#/editor/');
    cy.get('.editor-page form').should('be.visible').as('articleForm');

    // fill form
    cy.get('@articleForm').find('input[ng-model$="title"]').type(article.title);
    cy.get('@articleForm').find('input[ng-model$="description"]').type(article.description);
    cy.get('@articleForm').find('textarea[ng-model$="body"]').type(article.body);
    cy.get('@articleForm').find('input[ng-model$="tagField"]').type(article.tags).type('{enter}');

    // save article
    cy.get('@articleForm').find('button').click();

};

export function checkMyArticles() {
    cy.url().should('include', '/#/article/', article.title);
    cy.get('.article-page h1[ng-bind$="title"]').should('contain.text', article.title);
    cy.get('.article-content [ng-bind-html$="article.body"]').should('contain.text', article.body);
    cy.get('.article-content [ng-repeat$="tagList"]').should('contain.text', article.tags);

};

export function fillForm() {
    cy.get('.editor-page form').should('be.visible').as('articleForm');

    // fill form
    cy.get('@articleForm').find('input[ng-model$="title"]').type(article.title);
    cy.get('@articleForm').find('input[ng-model$="description"]').type(article.description);
    cy.get('@articleForm').find('textarea[ng-model$="body"]').type(article.body);
    cy.get('@articleForm').find('input[ng-model$="tagField"]').type(article.tags).type('{enter}');
    cy.get('@articleForm').find('button').click();
};

export function openMyArticles() {

    cy.get('.navbar a[ui-sref*=profile]').click();

    cy.url().should('include', meUser.username);

    cy.get('.articles-toggle').contains('My Articles')
        .parents('li').should('be.visible');

    cy.get('article-preview:first-of-type [ng-bind$="article.title"]').click();

};

export function clearArticle() {

    cy.get('.editor-page form').should('be.visible').as('editForm');

    cy.get('@editForm').find('input[ng-model$="title"]').clear();
    cy.get('@editForm').find('[ng-model$="description"]').clear();
    cy.get('@editForm').find('[ng-model$="body"]').clear();
    cy.get('@editForm').find('[ng-click$="removeTag(tag)"]').click();

};
