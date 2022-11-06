///<reference types="cypress" />
Cypress.on('uncaught:exception', () => false);
import { login } from "../support/shared";
import { addArticle } from "../support/shared";
import { checkMyArticles } from "../support/shared";
import { faker } from '@faker-js/faker';

// **1. issue / here is no need this function , and that's why no need faker,js**
export function generateFakeArticle() {
    return {
        title: faker.lorem.words(6),
        description: faker.lorem.sentence(20),
        body: faker.lorem.text(300),
        tags: faker.lorem.words(3)
    };
}

 

describe('Articles', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.get('.navbar').as('appHeader');
        login();

    });

    it.only('should do publish article', () => {

        // publishArticle
        addArticle();
        // check article data
        checkMyArticles();

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

        cy.url().should('match', /\/\#\/$/);

        // waiting articles are loaded
        cy.get('@myArticles').find('article-preview')
            .should('have.length.greaterThan', 0);

        // check article are not presented
        cy.get('@myArticles').contains(article.title)
            .should('have.length', 0);
    }



});
