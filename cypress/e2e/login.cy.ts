import { faker } from "@faker-js/faker"

describe("Login", function(){
    beforeEach(function(){
        cy.visit(Cypress.env('BASE_URL'));
    });

    it("Should display error message if login and password are not registred", function(){
        const fakeLogin = faker.internet.username();
        const fakePassword = faker.internet.password({length:20});    
        cy.login(fakeLogin, fakePassword);    

        cy.get('[data-valmsg-for="Password"]').should('be.visible');
        cy.get('[data-valmsg-for="Password"]').should(($err) => {
            expect($err).to.contain('Неверный логин или пароль');
        });      
    });

    it("Should display error message if login and password have invalid format", function(){
        cy.login(Cypress.env('INVALID_LOGIN'), Cypress.env('INVALID_PASSWORD'));

        cy.get('#UserName-error').should('be.visible');
        cy.get('#UserName-error').should(($err) => {
            expect($err).to.contain(
                'Поле "Логин" должно быть строкой с минимальной длиной 3 и максимальной 20.'
            );
        });

        cy.get('#Password-error').should('be.visible');
        cy.get('#Password-error').should(($err) => {
            expect($err).to.contain(
                'Поле "Пароль" должно быть строкой с минимальной длиной 8 и максимальной 64.'
            );            
        });      
    });

});