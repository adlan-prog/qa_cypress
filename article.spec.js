///<reference types="cypress" />
Cypress.on('uncaught:exception', () => false);
import { generateFakeArticle } from "../../js_examples/faker.mjs";
const article = generateFakeArticle();
//import meUser from "../fixtures/me-user.json";
import {
    fillForm, openMyArticles, addArticle,
    checkMyArticles, login, clearArticle
} from "../support/shared";



describe('Articles', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.get('.navbar').as('appHeader');
        login();

    });

    it('should do publish article', () => {

        // publishArticle
        addArticle();

        // check article data
        checkMyArticles();

    });

    it('should do  delete article', () => {

        cy.url().should('include', '/#/');

        addArticle();

       // cy.get('.article-page').should('be.visible');

        openMyArticles();

        // delete article 
        cy.contains('Delete Article').click()[1];

        cy.get('.article-preview:nth-child(2)')
            .should('not.have.text', article.title);
    
    });

    it('should do  edit article', () => {
        // before
        cy.url().should('include', '/#/');
        addArticle();

        cy.get('.article-page').should('be.visible');

        openMyArticles();

        cy.get('.article-page').should('be.visible');

        //edit article
        cy.get('article-actions:nth-child(2) [href*="#/editor"]').click();

        //clear fields
        clearArticle();

        //fill article
        fillForm();

        //checkArticle
        checkMyArticles();


    });


});
