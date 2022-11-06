///<reference types="cypress" />
Cypress.on('uncaught:exception', () => false);
import { login } from "../support/shared";
import { addArticle } from "../support/shared";
import { generateFakeArticle } from "../support/shared";

describe('Articles', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.get('.navbar').as('appHeader');
        login();
        cy.url().should('include', '/#/');
    });

    it.only('should do publish article', () => {

        const article = generateFakeArticle();

        // publishArticle
        addArticle();

        // check article data
        cy.url().should('include', '/#/', article.title);
        cy.get('.article-page h1[ng-bind$="title"]').should('contain.text', article.title);
        cy.get('.article-content [ng-bind-html$="article.body"]').should('contain', article.body);
        cy.get('.article-content [ng-repeat$="tagList"]').should('contain', article.tags);

    });


    it('should do  delete article'), () => {

        // addArticle
        addArticle();

        // Open me profile
        cy.get('.navbar a[ui-sref*=profile]').click();
        cy.url().should('include', '/#@{user_name}');

        // Find my article
        const article = addArticle();
        cy.get('article-list').contains(article.title)
            .parents('article-preview')
            .find('a.preview-link').click();

        // delete article 
        cy.get('article-actions button')[3].click();

        // waiting articles are loaded
        cy.get('@myArticles').find('article-preview')
            .should('have.length.greaterThan', 0);

        // check article are not presented
        cy.get('@myArticles').contains(article.title)
            .should('have.length', 0);
    }



});
