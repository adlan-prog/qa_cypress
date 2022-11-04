///<reference types="cypress" />
Cypress.on('uncaught:exception', () => false);
import { faker } from "@faker-js/faker";
import { login } from "../support/shared";

export function generateFakeArticle() {
    return {
        title: faker.lorem.words(5),
        description: faker.lorem.sentence(20),
        body: faker.lorem.text(300),
        tags: faker.lorem.words(3)
    };

}

describe('make_article', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.get('.navbar').as('appHeader');
        login();
    });

    it('should do publish article', () => {

        // Open editor
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

        // check article data
        cy.url().should('include', '/#/', article.title);
        cy.get('.article-page h1[ng-bind$="title"]').should('contain.text', article.title);
        cy.get('.article-content [ng-bind-html$="article.body"]').should('contain', article.body);
        cy.get('.article-content [ng-repeat$="tagList"]').should('contain', article.tags);






    });



});
